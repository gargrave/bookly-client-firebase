import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import { auth } from '../globals/firebase/';
import { setInitialized } from '../store/actions/app-actions';
import { setLocalUserData } from '../store/actions/auth-actions';

import SimpleHeader from './bookly/header/SimpleHeader';
import Routes from './Routes';

import './AppWrapper.css';

class AppWrapper extends Component {
  async componentWillMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.setLocalUserData(user);
      }
      this.props.setInitialized();
    });
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
  setInitialized: func.isRequired,
  setLocalUserData: func.isRequired,
};

/* eslint-disable no-unused-vars */
const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  setInitialized() {
    return dispatch(setInitialized());
  },

  setLocalUserData(user) {
    return dispatch(setLocalUserData(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
