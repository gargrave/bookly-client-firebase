import { reducerContainer } from '../../../store/helpers';

import { fetchProfile, fetchProfileReducer } from './fetchProfile';
import { requestEndReducer } from './requestEnd';
import { requestStartReducer } from './requestStart';
import { updateProfile, updateProfileReducer } from './updateProfile';

import types from './types';

const defaultState = () => ({
  data: {},
  profileRequestPending: false,
});

export default reducerContainer(
  defaultState(),
  {
    [types.FETCH]: fetchProfileReducer,
    [types.REQUEST_END]: requestEndReducer,
    [types.REQUEST_START]: requestStartReducer,
    [types.UPDATE]: updateProfileReducer,
  }
);

export const actions = {
  fetchProfile,
  updateProfile,
};
