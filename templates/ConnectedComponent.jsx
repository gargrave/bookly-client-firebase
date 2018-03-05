// @flow
import React from 'react';
import { connect } from 'react-redux';

type Props = {
};

type State = {
};

class COMPONENT_NAME extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <h2>COMPONENT_NAME</h2>
      </div>
    );
  }
}

COMPONENT_NAME.propTypes = {
};

/* eslint-disable no-unused-vars */
const mapStateToProps = (state: any, ownProps: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(COMPONENT_NAME);
