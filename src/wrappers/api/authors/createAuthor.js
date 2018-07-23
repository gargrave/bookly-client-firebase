// @flow
import type { Author } from '../../../modules/authors/flowtypes';
import type { FbDoc, FbDocRef } from '../../../wrappers/firebase/flowtypes';

import { db, fbTimestamp } from '../../firebase';
import { authorModel } from '../../../modules/authors/models';

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
