// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from '../../../auth/actions'
import { actions as snackbarActions } from '../../../snackbar/actions'

import PasswordResetPage from '../../views/PasswordResetPage/PasswordResetPage'

const mapStateToProps = (state: any) => ({
  passwordResetEmailSentTo: state.auth.passwordResetEmailSentTo,
})

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actions, dispatch),
  snackbarActions: bindActionCreators(snackbarActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordResetPage)
