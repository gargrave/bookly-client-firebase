// @flow
import type { FbDoc, FbDocRef } from '../../../modules/core/flowtypes';
import type { Profile } from '../../../modules/profiles/flowtypes';

import { db, fbTimestamp } from '../../../globals/firebase/';
import profileModel from '../../../models/Profile.model';

import { getCurrentUserId } from '../../auth';

const updateProfileOnAPI = async (profile: Profile): Promise<?Profile> => {
  const userId = getCurrentUserId();
  if (!userId) {
    return undefined;
  }

  const payload = {
    firstName: profile.firstName,
    lastName: profile.lastName,
    created: profile.created || fbTimestamp(),
    updated: fbTimestamp(),
  };

  const docRef: FbDocRef = await db
    .collection('profiles')
    .doc(userId);
  await docRef.update(payload);
  const doc: FbDoc = await docRef.get();
  return profileModel.fromAPI(doc);
};

export default updateProfileOnAPI;
