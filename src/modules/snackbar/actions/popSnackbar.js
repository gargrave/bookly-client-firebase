// @flow
import types from './types'

export const popSnackbar = () => async (dispatch: any) => {
  dispatch({ type: types.POP })
}

export const popSnackbarReducer = (state: any) => ({
  ...state,
  queue: state.queue.slice(1),
})
