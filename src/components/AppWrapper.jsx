import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import { auth } from '../globals/firebase/';
import { setInitialized } from '../store/actions/appActions';
import { setLocalUserData } from '../store/actions/authActions';
import { fetchBooks } from '../store/actions/bookActions';

import Routes from './Routes';
import Snackbar from '../containers/common/Snackbar/';
import SimpleHeader from './bookly/header/SimpleHeader';

import './AppWrapper.css';

class AppWrapper extends Component {
  async componentWillMount() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.props.setLocalUserData(user);
        await this.props.fetchBooks();
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
          <Snackbar />
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
  fetchBooks() {
    return dispatch(fetchBooks());
  },

  setInitialized() {
    return dispatch(setInitialized());
  },

  setLocalUserData(user) {
    return dispatch(setLocalUserData(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
