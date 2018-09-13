// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { localUrls } from '../../../../globals/urls'

import { actions } from '../../../auth/actions'

import LoginPage from '../../views/LoginPage/LoginPage'
import AuthenticatedRoute from '../../../common/components/hocs/AuthenticatedRoute/AuthenticatedRoute'

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthenticatedRoute(LoginPage, localUrls.account, false))
