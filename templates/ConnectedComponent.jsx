import React, { Component } from 'react'
import { connect } from 'react-redux'

class COMPONENT_NAME extends Component {
  render () {
    return (
      <div>
        <h2>COMPONENT_NAME</h2>
      </div>
    )
  }
}

COMPONENT_NAME.propTypes = {}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(COMPONENT_NAME)
