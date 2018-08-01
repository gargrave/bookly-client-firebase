// @flow
import type { Author } from '../../../modules/authors/flowtypes';
import type { FbDoc, FbDocRef } from '../../../wrappers/firebase/flowtypes';

import { authorModel } from '../../../modules/authors/models';
import { db, fbTimestamp } from '../../firebase';
import { parseFbDoc } from '../../firebase/firestoreHelpers';

import { getCurrentUserId } from '../../auth';

const createAuthorOnAPI = async (author: Author): Promise<?Author> => {
  const userId = getCurrentUserId();
  if (!userId) {
    return undefined;
  }

  const payload = {
    owner: userId,
    created: fbTimestamp(),
    updated: fbTimestamp(),
    ...author,
  };

  const docRef: FbDocRef = await db
    .collection('authors')
    .add(payload);
  const doc: FbDoc = await docRef.get();
  return authorModel.fromAPI(parseFbDoc(doc));
};

export default createAuthorOnAPI;
