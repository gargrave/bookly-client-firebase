import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from '../../actions'
import { actions as authActions } from '../../../auth/actions'
import { actions as bookActions } from '../../../books/actions'
import { actions as profileActions } from '../../../profiles/actions'

import App from '../../components/App/App'

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  authActions: bindActionCreators(authActions, dispatch),
  bookActions: bindActionCreators(bookActions, dispatch),
  profileActions: bindActionCreators(profileActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
