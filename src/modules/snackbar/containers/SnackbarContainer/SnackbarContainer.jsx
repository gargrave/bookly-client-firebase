// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from '../../actions'

import Snackbar from '../../components/Snackbar/Snackbar'

const mapStateToProps = (state: any) => ({
  queue: state.snackbar.queue || [],
})

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Snackbar)
