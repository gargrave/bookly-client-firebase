// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bool, func, object } from 'prop-types';

import type { Profile, User } from '../../../../globals/flowtypes';

import { localUrls } from '../../../../globals/urls';
import { createSnackbar, logout, markVerificationEmailSent } from '../../../../store/actions';
import { sendAccountVerificationEmail } from '../../../../wrappers/auth';

import AccountDetailView from '../../../bookly/account/AccountDetailView/AccountDetailView';
import AccountEditView from '../../../bookly/account/AccountEditView/AccountEditView';
import CardList from '../../../common/CardList';
import RequiresAuth from '../../../common/hocs/RequiresAuth';

type Props = {
  createSnackbar: Function,
  history: any,
  logout: Function,
  markVerificationEmailSent: Function,
  profile: Profile,
  user: User,
  verificationEmailHasBeenSent: boolean,
};

type State = {
  editing: boolean,
};

class AccountDetailPage extends Component<Props, State> {
  static propTypes = {
    createSnackbar: func.isRequired,
    history: object.isRequired,
    logout: func.isRequired,
    markVerificationEmailSent: func.isRequired,
    profile: object.isRequired,
    user: object.isRequired,
    verificationEmailHasBeenSent: bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    };
  }

  onEditClick = () => {
    this.setState({ editing: true });
  }

  onCancelClick = () => {
    this.setState({ editing: false });
  }

  onLogoutClick = async () => {
    await this.props.logout();
    this.props.history.push(localUrls.login);
  }

  onVerifyAccountClick = async () => {
    try {
      await sendAccountVerificationEmail();
      this.props.markVerificationEmailSent();
    } catch (err) {
      this.props.createSnackbar('There was an error sending the email.');
    }
  }

  renderDetailView() {
    const {
      profile,
      user,
      verificationEmailHasBeenSent,
    } = this.props;

    return (
      <AccountDetailView
        onEditClick={this.onEditClick}
        onLogoutClick={this.onLogoutClick}
        onVerifyAccountClick={this.onVerifyAccountClick}
        profile={profile}
        user={user}
        verificationEmailHasBeenSent={verificationEmailHasBeenSent}
      />
    );
  }

  renderEditView() {
    const {
      profile,
      user,
    } = this.props;

    return (
      <AccountEditView
        onCancelClick={this.onCancelClick}
        profile={profile}
        user={user}
      />
    );
  }

  render() {
    const { editing } = this.state;

    return (
      <CardList>
        {!editing && this.renderDetailView()}
        {editing && this.renderEditView()}
      </CardList>
    );
  }
}

/* eslint-disable no-unused-vars */
const mapStateToProps = (state, ownProps) => ({
  profile: state.profile.data,
  user: state.auth.user,
  verificationEmailHasBeenSent: state.auth.verificationEmailSent,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createSnackbar(message: string) {
    return dispatch(createSnackbar(message));
  },

  logout() {
    return dispatch(logout());
  },

  markVerificationEmailSent() {
    return dispatch(markVerificationEmailSent());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RequiresAuth(AccountDetailPage, localUrls.login)
);
