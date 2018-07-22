// @flow
import { connect } from 'react-redux';

import type { Profile } from '../../../profiles/flowtypes';

import { localUrls } from '../../../../globals/urls';

import { actions } from '../../../auth/actions';
import { actions as profileActions } from '../../../profiles/actions';
import { actions as snackbarActions } from '../../../snackbar/actions';

import AccountDetailPage from '../../views/AccountDetailPage/AccountDetailPage';
import RequiresAuth from '../../../common/components/hocs/RequiresAuth/RequiresAuth';

const { logout, markVerificationEmailSent } = actions;
const { updateProfile } = profileActions;
const { createSnackbar } = snackbarActions;

const mapStateToProps = (state) => ({
  profile: state.profile.data,
  user: state.auth.user,
  verificationEmailHasBeenSent: state.auth.verificationEmailSent,
});

const mapDispatchToProps = (dispatch) => ({
  createSnackbar(message: string) {
    return dispatch(createSnackbar(message));
  },

  logout() {
    return dispatch(logout());
  },

  markVerificationEmailSent() {
    return dispatch(markVerificationEmailSent());
  },

  updateProfile(profile: Profile) {
    return dispatch(updateProfile(profile));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RequiresAuth(AccountDetailPage, localUrls.login)
);
