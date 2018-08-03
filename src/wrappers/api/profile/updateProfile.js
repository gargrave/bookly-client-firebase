// @flow
import type { FbDoc, FbDocRef } from '../../../wrappers/firebase/flowtypes';
import type { Profile } from '../../../modules/profiles/flowtypes';

import { profileModel } from '../../../modules/profiles/models';
import { db, fbTimestamp } from '../../firebase';
import { parseFbDoc } from '../../firebase/firestoreHelpers';

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
  return profileModel.fromAPI(parseFbDoc(doc));
};

export default updateProfileOnAPI;
