import { APP } from '../../actionTypes';

import { actionContainer } from '../helpers';

import defaultState from './defaultState';

import apiError from './apiError';
import setInitialized from './setInitialized';

const actions = {
  [APP.INITIALIZED]: setInitialized,
  [APP.API_ERROR]: apiError,
};

export default actionContainer(defaultState, actions);
