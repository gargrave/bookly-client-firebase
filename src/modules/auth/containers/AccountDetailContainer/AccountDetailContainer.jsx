// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { localUrls } from '../../../../globals/urls'

import { actions } from '../../../auth/actions'
import { actions as profileActions } from '../../../profiles/actions'
import { actions as snackbarActions } from '../../../snackbar/actions'

import AccountDetailPage from '../../views/AccountDetailPage/AccountDetailPage'
import AuthenticatedRoute from '../../../common/components/hocs/AuthenticatedRoute/AuthenticatedRoute'

const mapStateToProps = (state: any) => ({
  profile: state.profile.data,
  user: state.auth.user,
  verificationEmailHasBeenSent: state.auth.verificationEmailSent,
})

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actions, dispatch),
  profileActions: bindActionCreators(profileActions, dispatch),
  snackbarActions: bindActionCreators(snackbarActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthenticatedRoute(AccountDetailPage, localUrls.login))
