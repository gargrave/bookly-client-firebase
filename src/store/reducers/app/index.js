import { APP } from '../../actionTypes';

import { actionContainer } from '../helpers';

import defaultState from './defaultState';

import apiError from './apiError';
import setInitialized from './setInitialized';

const actions = {
  [APP.API_ERROR]: apiError,
  [APP.INITIALIZED]: setInitialized,
};

export default actionContainer(defaultState, actions);
