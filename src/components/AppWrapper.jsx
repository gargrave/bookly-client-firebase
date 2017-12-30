import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import { setInitialized } from '../store/actions/app-actions';
import { fetchProfile } from '../store/actions/auth-actions';

import SimpleHeader from './bookly/header/SimpleHeader';
import Routes from './Routes';

import './AppWrapper.css';

class AppWrapper extends Component {
  async componentWillMount() {
    const token = window.localStorage ? localStorage.getItem('authToken') : null;
    if (token) {
      await this.props.fetchProfile(token);
    }
    this.props.setInitialized();
  }

  render() {
    return (
      <BrowserRouter>
        <div id="bookly-app" className="App">
          <h1>Bookly</h1>
          <SimpleHeader />
          <main className="main-view">
            <Routes />
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

AppWrapper.propTypes = {
  fetchProfile: func.isRequired,
  setInitialized: func.isRequired,
};

/* eslint-disable no-unused-vars */
const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchProfile(token) {
    return dispatch(fetchProfile(token));
  },

  setInitialized() {
    return dispatch(setInitialized());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
