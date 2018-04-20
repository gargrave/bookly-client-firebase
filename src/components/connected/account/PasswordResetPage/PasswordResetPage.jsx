// @flow
import React from 'react';
import { connect } from 'react-redux';

type Props = {
};

type State = {
};

class PasswordResetPage extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <h2>PasswordResetPage</h2>
      </div>
    );
  }
}

PasswordResetPage.propTypes = {
};

/* eslint-disable no-unused-vars */
const mapStateToProps = (state: any, ownProps: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetPage);
