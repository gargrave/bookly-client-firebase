import React, { Component } from 'react';
import { Provider } from 'react-redux';

import App from './components/App/App';

import store from '../../store/store';

class AppWrapper extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default AppWrapper;
