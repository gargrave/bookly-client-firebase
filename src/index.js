import React from 'react';
import ReactDOM from 'react-dom';

import './wrappers/firebase'; // initialize Firebase

import AppWrapper from './modules/core/AppWrapper';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(<AppWrapper />, document.getElementById('root'));
registerServiceWorker();
