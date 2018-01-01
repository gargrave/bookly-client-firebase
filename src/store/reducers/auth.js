import { AUTH } from '../action-types';

const defaultState = {
  userRequestPending: false,
  user: null,
};

export default function auth(state = defaultState, action) {
  switch (action.type) {
    case AUTH.REQUEST_START:
      return Object.assign({}, state, {
        userRequestPending: true,
      });

    case AUTH.REQUEST_END:
      return Object.assign({}, state, {
        userRequestPending: false,
      });

    case AUTH.LOGIN:
      return Object.assign({}, state, {
        user: action.payload.user,
      });

    case AUTH.LOGOUT:
      return Object.assign({}, defaultState);

    default:
      return state;
  }
}
