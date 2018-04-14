// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object } from 'prop-types';

import type { User } from '../../../../globals/flowtypes';

import { localUrls } from '../../../../globals/urls';
import { logout } from '../../../../store/actions';

import AccountDetailView from '../../../bookly/account/AccountDetailView/AccountDetailView';
import CardList from '../../../common/CardList';
import RequiresAuth from '../../../common/hocs/RequiresAuth';

type Props = {
  history: any,
  logout: Function,
  user: User,
};

class AccountDetailPage extends Component<Props> {
  constructor(props: Props) {
    super(props);

    const _this: any = this;
    _this.onLogoutClick = _this.onLogoutClick.bind(this);
  }

  async onLogoutClick(event) {
    event.preventDefault();
    await this.props.logout();
    this.props.history.push(localUrls.login);
  }

  render() {
    const {
      user,
    } = this.props;
    return (
      <CardList>
        <AccountDetailView
          onLogoutClick={this.onLogoutClick}
          user={user}
        />
      </CardList>
    );
  }
}

AccountDetailPage.propTypes = {
  history: object.isRequired,
  user: object.isRequired,
};

/* eslint-disable no-unused-vars */
const mapStateToProps = (state, ownProps) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout() {
    return dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RequiresAuth(AccountDetailPage, localUrls.login));
