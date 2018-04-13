import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import { auth } from '../globals/firebase/';
import { fetchBooks } from '../store/actions';
import { localUrls } from '../constants/urls';
import { setInitialized } from '../store/actions/appActions';
import { setLocalUserData } from '../store/actions';

import Routes from './Routes';
import SexyHeader from './common/SexyHeader';
import Snackbar from '../containers/common/Snackbar/';

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

class AppWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    };
  }

  async componentWillMount() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.props.setLocalUserData(user);
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
