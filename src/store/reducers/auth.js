import { AUTH } from '../action-types';

import profileModel from '../../models/Profile.model';
import userModel from '../../models/User.model';

const defaultState = {
  userRequestPending: false,
  user: userModel.empty(),
  token: null,
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

    // update store with user data and token from response
    case AUTH.LOGIN:
      return Object.assign({}, state, {
        user: userModel.fromAPI(action.payload.user),
        token: action.payload.user.token,
      });

    case AUTH.LOGOUT:
      return Object.assign({}, defaultState);

    case AUTH.FETCH_PROFILE:
      return Object.assign({}, state, {
        profile: profileModel.fromAPI(action.payload.profile),
      });

    default:
      return state;
  }
}
