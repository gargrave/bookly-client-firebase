import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import { auth } from '../globals/firebase/';
import { fetchBooks } from '../store/actions/bookActions';
import { localUrls } from '../constants/urls';
import { setInitialized } from '../store/actions/appActions';
import { setLocalUserData } from '../store/actions/authActions';

import Routes from './Routes';
import SexyHeader from './common/SexyHeader';
import Snackbar from '../containers/common/Snackbar/';

import './AppWrapper.css';

const HEADER_HEIGHT = 50;

const styles = () => ({
  marginTop: Math.floor(HEADER_HEIGHT * 1.5),
});

const links = () => (
  [
    { to: '/', text: 'Home' },
    { to: localUrls.booksList, text: 'Books' },
    { to: localUrls.authorsList, text: 'Authors' },
    { to: localUrls.account, text: 'Account' },
  ]
);

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
        <div
          id="bookly-app"
          className="App"
          style={styles()}
        >
          <SexyHeader
            height={HEADER_HEIGHT}
            links={links()}
            title={'Bookly'}
          />
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
