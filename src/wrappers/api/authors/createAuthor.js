// @flow
import type { Author, FbDoc, FbDocRef } from '../../../globals/flowtypes';

import { db, fbTimestamp } from '../../../globals/firebase/';
import { authorModel } from '../../../models/Author.model';

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
  return authorModel.fromAPI(doc);
};

export default createAuthorOnAPI;
