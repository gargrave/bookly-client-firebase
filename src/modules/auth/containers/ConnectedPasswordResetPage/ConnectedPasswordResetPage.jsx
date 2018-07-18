// @flow
import React from 'react';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';

import { createSnackbar, markPasswordResetEmailSent } from '../../../../store/actions';

import PasswordResetPage from '../../components/PasswordResetPage/PasswordResetPage';

type Props = {
  createSnackbar: Function,
  markPasswordResetEmailSent: Function,
  passwordResetEmailSentTo: string,
};

class ConnectedPasswordResetPage extends React.Component<Props> {
  static propTypes = {
    createSnackbar: func.isRequired,
    markPasswordResetEmailSent: func.isRequired,
    passwordResetEmailSentTo: string,
  }

  render() {
    return (
      <PasswordResetPage {...this.props} />
    );
  }
}

/* eslint-disable no-unused-vars */
const mapStateToProps = (state: any, ownProps: any) => ({
  passwordResetEmailSentTo: state.auth.passwordResetEmailSentTo,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  createSnackbar(message: string) {
    return dispatch(createSnackbar(message));
  },

  markPasswordResetEmailSent(email: string) {
    return dispatch(markPasswordResetEmailSent(email));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedPasswordResetPage);
