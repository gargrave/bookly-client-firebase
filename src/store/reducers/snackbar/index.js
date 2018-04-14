import { SNACKBAR } from '../../actionTypes';

import { actionContainer } from '../helpers';

import defaultState from './defaultState';

import createSnackbar from './createSnackbar';
import popSnackbar from './popSnackbar';

const actions = {
  [SNACKBAR.CREATE_SNACKBAR]: createSnackbar,
  [SNACKBAR.POP_SNACKBAR]: popSnackbar,
};

export default actionContainer(defaultState, actions);
