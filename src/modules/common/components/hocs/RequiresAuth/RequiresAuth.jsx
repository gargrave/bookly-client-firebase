/*
A simple HOC to allow a component to check out authentication before being mounted.
If the user is not authenticated, the component will redirect to the specified path.
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bool } from 'prop-types';

export default function(WrappedComponent, redirectTo, requireAuth = true) {
  class RequiresAuth extends Component {
    content() {
      if (this.props.initialized) {
        const shouldRedirect = requireAuth ? !this.props.loggedIn : this.props.loggedIn;
        return shouldRedirect ? <Redirect to={redirectTo} /> : <WrappedComponent {...this.props} />;
      } else {
        return <p>Loading...</p>;
      }
    }

    render() {
      return this.content();
    }
  }

  RequiresAuth.propTypes = {
    initialized: bool.isRequired,
    loggedIn: bool.isRequired,
  };

  function mapStateToProps(state) {
    return {
      initialized: state.core.initialized,
      loggedIn: !!state.auth.user,
    };
  }

  return connect(mapStateToProps)(RequiresAuth);
}
