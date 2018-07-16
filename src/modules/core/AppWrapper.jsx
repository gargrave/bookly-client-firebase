import React, { Component } from 'react';
import { Provider } from 'react-redux';

import AppContainer from './containers/AppContainer/AppContainer';

import store from '../../store/store';

class AppWrapper extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default AppWrapper;
