import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { func, shape } from 'prop-types';

import { firebaseAuth } from '../../../../globals/firebase/';
import { localUrls } from '../../../../globals/urls';

import SexyHeader from '../../../common/components/SexyHeader/SexyHeader';
import Snackbar from '../../../common/containers/Snackbar/Snackbar';

import Router from '../../Router';

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
  static propTypes = {
    actions: shape({
      setInitialized: func.isRequired,
    }).isRequired,
    fetchBooks: func.isRequired,
    fetchProfile: func.isRequired,
    setLocalUserData: func.isRequired,
  }

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
        this.props.actions.setInitialized();
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
            <Router />
          </main>
          <Snackbar />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
