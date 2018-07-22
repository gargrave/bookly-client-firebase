// @flow
import { connect } from 'react-redux';

import { actions } from '../../../auth/actions';
import { actions as snackbarActions } from '../../../snackbar/actions';

import PasswordResetPage from '../../views/PasswordResetPage/PasswordResetPage';

const { markPasswordResetEmailSent } = actions;
const { createSnackbar } = snackbarActions;

const mapStateToProps = (state: any) => ({
  passwordResetEmailSentTo: state.auth.passwordResetEmailSentTo,
});

const mapDispatchToProps = (dispatch: any) => ({
  createSnackbar(message: string) {
    return dispatch(createSnackbar(message));
  },

  markPasswordResetEmailSent(email: string) {
    return dispatch(markPasswordResetEmailSent(email));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetPage);
