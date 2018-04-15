// @flow
import type { Profile, FbDoc, FbDocRef } from '../../../globals/flowtypes';

import { db, fbTimestamp } from '../../../globals/firebase/';
import profileModel from '../../../models/Profile.model';

import { getCurrentUserId } from '../../auth';

const createProfileOnAPI = async (): Promise<?Profile> => {
  const userId = getCurrentUserId();
  if (!userId) {
    return undefined;
  }

  const payload = {
    owner: userId,
    created: fbTimestamp(),
    updated: fbTimestamp(),
    firstName: '',
    lastName: '',
  };

  const docRef: FbDocRef = db
    .collection('profiles')
    .doc(userId);
  await docRef.set(payload);

  const doc: FbDoc = await docRef.get();
  return profileModel.fromAPI(doc);
};

export default createProfileOnAPI;
