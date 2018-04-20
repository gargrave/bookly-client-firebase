// @flow
import type { Profile } from '../../../globals/flowtypes';

import { updateProfileOnAPI } from '../../../wrappers/api';
import { parseAPIError } from '../../../wrappers/errors';

import { PROFILE } from '../../actionTypes';

import apiError from '../app/apiError';

import profileRequestEnd from './profileRequestEnd';
import profileRequestStart from './profileRequestStart';

const _updateProfile = (profile: Profile) => ({
  type: PROFILE.UPDATE_SUCCESS,
  payload: { profile },
});

const updateProfile = (profile: Profile) =>
  async (dispatch: Function) => {
    dispatch(profileRequestStart());

    try {
      const updatedRecord = await updateProfileOnAPI(profile);
      dispatch(_updateProfile(updatedRecord));
      return updatedRecord;
    } catch (err) {
      dispatch(apiError(err));
      throw parseAPIError(err);
    } finally {
      dispatch(profileRequestEnd());
    }
  };

export default updateProfile;
