import { reducerContainer } from '../../../store/helpers'

import { createSnackbar, createSnackbarReducer } from './createSnackbar'
import { popSnackbar, popSnackbarReducer } from './popSnackbar'

import types from './types'

const defaultState = () => ({
  queue: [],
})

export default reducerContainer(defaultState(), {
  [types.CREATE]: createSnackbarReducer,
  [types.POP]: popSnackbarReducer,
})

export const actions = {
  createSnackbar,
  popSnackbar,
}
