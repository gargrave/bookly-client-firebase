import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { func, shape } from 'prop-types'
import styled from 'react-emotion'

import { isDevEnv } from '../../../../globals/env'
import { localUrls } from '../../../../globals/urls'
import { colors } from '../../../../styles/'
import { firebaseAuth } from '../../../../wrappers/firebase'

import SexyHeader from '../../../common/components/SexyHeader'
import SnackbarContainer from '../../../snackbar/containers/SnackbarContainer/SnackbarContainer'

import Router from '../../Router'

const HEADER_HEIGHT = 50
const TITLE = `Bookly${isDevEnv() ? ' (dev)' : ''}`

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

const Styled = styled('div')`
  color: ${colors.textLight};
  margin: auto;
  margin-top: ${Math.floor(HEADER_HEIGHT * 1.5)}px;
  max-width: 800px;
`

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

  state = {
    loggedIn: false,
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
        <Styled>
          <SexyHeader
            headerHeight={HEADER_HEIGHT}
            links={links}
            title={TITLE}
          />
          <main>
            <Router />
          </main>
          <SnackbarContainer />
        </Styled>
      </BrowserRouter>
    )
  }
}

export default App
