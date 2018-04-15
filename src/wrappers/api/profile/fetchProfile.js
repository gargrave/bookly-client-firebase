// @flow
import type { FbDoc, FbDocRef, Profile } from '../../../globals/flowtypes';

import { db } from '../../../globals/firebase/';
import profileModel from '../../../models/Profile.model';

import { getCurrentUserId } from '../../auth';

import createProfileOnAPI from './createProfile';

const fetchProfileFromAPI = async (): Promise<?Profile> => {
  const userId = getCurrentUserId();
  if (!userId) {
    return {};
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
