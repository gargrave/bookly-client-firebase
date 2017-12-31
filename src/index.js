import React from 'react';
import ReactDOM from 'react-dom';

import './globals/firebase/'; // initialize Firebase

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
