import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import { firebaseAuth } from '../../../../globals/firebase/';
import { fetchBooks, fetchProfile } from '../../../../store/actions';
import { localUrls } from '../../../../globals/urls';
import { setInitialized, setLocalUserData } from '../../../../store/actions';

import Routes from '../../../../components/app/routes';
import SexyHeader from '../../../../components/common/SexyHeader/SexyHeader';
import Snackbar from '../../../../components/connected/common/Snackbar';

import './App.css';

const HEADER_HEIGHT = 50;

const styles = () => ({
  marginTop: Math.floor(HEADER_HEIGHT * 1.5),
});

const notLoggedInLinks = [
  { to: localUrls.login, text: 'Login' },
  { to: localUrls.register, text: 'Register' },
];

const loggedInLinks = [
  { to: '/', text: 'Home' },
  { to: localUrls.booksList, text: 'Books' },
  { to: localUrls.authorsList, text: 'Authors' },
  { to: localUrls.account, text: 'Account' },
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    };
  }

  async componentWillMount() {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        this.props.setLocalUserData(user);
        this.props.fetchProfile();
        await this.props.fetchBooks();
      }

      this.setState({
        loggedIn: !!user,
      }, () => {
        this.props.setInitialized();
      });
    });
  }

  render() {
    const {
      loggedIn,
    } = this.state;

    return (
      <BrowserRouter>
        <div
          id="bookly-app"
          className="App"
          style={styles()}
        >
          <SexyHeader
            height={HEADER_HEIGHT}
            loggedIn={loggedIn}
            loggedInLinks={loggedInLinks}
            notLoggedInLinks={notLoggedInLinks}
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

App.propTypes = {
  fetchBooks: func.isRequired,
  fetchProfile: func.isRequired,
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

  fetchProfile() {
    return dispatch(fetchProfile());
  },

  setInitialized() {
    return dispatch(setInitialized());
  },

  setLocalUserData(user) {
    return dispatch(setLocalUserData(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
