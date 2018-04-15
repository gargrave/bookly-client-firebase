// @flow
import type { FbCollection, FbDoc, FbDocRef, Profile } from '../../../globals/flowtypes';

import { db } from '../../../globals/firebase/';
import profileModel from '../../../models/Profile.model';

import { getCurrentUserId } from '../../auth';

const fetchProfileFromAPI = async (): Promise<?Profile> => {
  const userId = getCurrentUserId();
  if (!userId) {
    return {};
  }

  const docRef: FbDocRef = db
    .collection('profiles')
    .doc(userId);
  const doc: FbDoc = await docRef.get();
  return profileModel.fromAPI(doc);
};

export default fetchProfileFromAPI;
