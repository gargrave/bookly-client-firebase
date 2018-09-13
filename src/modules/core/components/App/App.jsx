import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { func, shape } from 'prop-types'

import { isDevEnv } from '../../../../globals/env'
import { localUrls } from '../../../../globals/urls'
import { firebaseAuth } from '../../../../wrappers/firebase'

import SexyHeader from '../../../common/components/SexyHeader/SexyHeader'
import SnackbarContainer from '../../../snackbar/containers/SnackbarContainer/SnackbarContainer'

import Router from '../../Router'

import styles from './App.css'

const HEADER_HEIGHT = 50
const TITLE = `Bookly${isDevEnv() ? ' (dev)' : ''}`

const extraStyles = {
  marginTop: Math.floor(HEADER_HEIGHT * 1.5),
}

const notLoggedInLinks = [
  { to: localUrls.login, text: 'Login' },
  { to: localUrls.register, text: 'Register' },
]

const loggedInLinks = [
  { to: '/', text: 'Home' },
  { to: localUrls.booksList, text: 'Books' },
  { to: localUrls.authorsList, text: 'Authors' },
  { to: localUrls.account, text: 'Account' },
]

class App extends Component {
  static propTypes = {
    actions: shape({
      setInitialized: func.isRequired,
    }).isRequired,
    authActions: shape({
      setLocalUserData: func.isRequired,
    }).isRequired,
    bookActions: shape({
      fetchBooks: func.isRequired,
    }).isRequired,
    profileActions: shape({
      fetchProfile: func.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
    }
  }

  async componentWillMount() {
    firebaseAuth.onAuthStateChanged(async user => {
      if (user) {
        this.props.authActions.setLocalUserData(user)
        this.props.profileActions.fetchProfile()
        await this.props.bookActions.fetchBooks()
      }

      this.setState(
        {
          loggedIn: !!user,
        },
        this.props.actions.setInitialized,
      )
    })
  }

  render() {
    const links = this.state.loggedIn ? loggedInLinks : notLoggedInLinks

    return (
      <BrowserRouter>
        <div className={styles.app} style={extraStyles}>
          <SexyHeader height={HEADER_HEIGHT} links={links} title={TITLE} />
          <main>
            <Router />
          </main>
          <SnackbarContainer />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
