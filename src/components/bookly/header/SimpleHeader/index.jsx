// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bool } from 'prop-types';

import { localUrls } from '../../../../constants/urls';

class SimpleHeader extends Component<any> {
  loggedInContent() {
    return (
      <span>
        <Link to={localUrls.booksList}>Books</Link>
        {' | '}
        <Link to={localUrls.authorsList}>Authors</Link>
        {' | '}
        <Link to={localUrls.account}>Account</Link>
      </span>
    );
  }

  notLoggedInContent() {
    return <Link to={localUrls.login}>Login</Link>;
  }

  render() {
    const content = this.props.loggedIn ? this.loggedInContent : this.notLoggedInContent;
    return (
      <div>
        <Link to="/">Home</Link>
        {' | '}
        {content()}
      </div>
    );
  }
}

SimpleHeader.propTypes = {
  loggedIn: bool.isRequired,
};

/* eslint-disable no-unused-vars */
const mapStateToProps = (state, ownProps) => {
  const loggedIn = !!state.auth.user;
  return {
    loggedIn,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SimpleHeader);
