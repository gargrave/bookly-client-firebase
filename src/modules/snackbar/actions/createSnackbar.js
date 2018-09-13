// @flow
import type { ReduxAction } from '../../common/flowtypes'

import types from './types'

const _createSnackbar = (message: string) => ({
  type: types.CREATE,
  payload: { message },
})

export const createSnackbar = (message: string) => async (dispatch: any) => {
  dispatch(_createSnackbar(message))
}

export const createSnackbarReducer = (state: any, action: ReduxAction) => ({
  ...state,
  queue: [...state.queue, { message: action.payload.message }],
})
