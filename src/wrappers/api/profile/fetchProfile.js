// @flow
import type { FbDoc, FbDocRef } from '../../../wrappers/firebase/flowtypes';
import type { Profile } from '../../../modules/profiles/flowtypes';

import { db } from '../../firebase';
import { profileModel } from '../../../modules/profiles/models';

import { getCurrentUserId } from '../../auth';

import createProfileOnAPI from './createProfile';

const fetchProfileFromAPI = async (): Promise<?Profile> => {
  const userId = getCurrentUserId();
  if (!userId) {
    return Promise.resolve(profileModel.empty());
  }

  const docRef: FbDocRef = db
    .collection('profiles')
    .doc(userId);
  const doc: FbDoc = await docRef.get();

  if (doc.exists) {
    return profileModel.fromAPI(doc);
  }
  return await createProfileOnAPI();
};

export default fetchProfileFromAPI;
