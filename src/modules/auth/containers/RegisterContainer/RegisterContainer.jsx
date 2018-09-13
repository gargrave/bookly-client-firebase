// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { localUrls } from '../../../../globals/urls'

import { actions } from '../../../auth/actions'

import RegisterPage from '../../views/RegisterPage/RegisterPage'
import AuthenticatedRoute from '../../../common/components/hocs/AuthenticatedRoute/AuthenticatedRoute'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthenticatedRoute(RegisterPage, localUrls.account, false))
