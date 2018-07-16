// @flow
import type { Profile } from '../../../modules/profiles/flowtypes';

import { fetchProfileFromAPI } from '../../../wrappers/api';
import { parseAPIError } from '../../../wrappers/errors';

import { PROFILE } from '../../actionTypes';

import apiError from '../app/apiError';

import profileRequestEnd from './profileRequestEnd';
import profileRequestStart from './profileRequestStart';

const _fetchProfile = (profile: Profile) => ({
  type: PROFILE.FETCH_SUCCESS,
  payload: profile,
});

const fetchProfile = () =>
  async (dispatch: Function) => {
    dispatch(profileRequestStart());

    try {
      const record = await fetchProfileFromAPI();
      dispatch(_fetchProfile(record));
      return record;
    } catch (err) {
      dispatch(apiError(err));
      throw parseAPIError(err);
    } finally {
      dispatch(profileRequestEnd());
    }
  };

export default fetchProfile;
