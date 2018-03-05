// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bool } from 'prop-types';

import { localUrls } from '../../../../constants/urls';

const loggedInContent = () => (
  <span>
    <Link to={localUrls.booksList}>Books</Link>
    {' | '}
    <Link to={localUrls.authorsList}>Authors</Link>
    {' | '}
    <Link to={localUrls.account}>Account</Link>
  </span>
);

const notLoggedInContent = () => (
  <Link to={localUrls.login}>Login</Link>
);

class SimpleHeader extends Component<any> {
  render() {
    const content = this.props.loggedIn
      ? loggedInContent
      : notLoggedInContent;
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
