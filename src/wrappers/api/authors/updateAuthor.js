// @flow
import type { Author } from '../../../modules/authors/flowtypes';
import type { FbDoc, FbDocRef } from '../../../modules/core/flowtypes';

import { db, fbTimestamp } from '../../firebase';
import { authorModel } from '../../../modules/authors/models';

import { getCurrentUserId } from '../../auth';

const updateAuthorOnAPI = async (author: Author): Promise<?Author> => {
  const userId = getCurrentUserId();
  if (!userId) {
    return undefined;
  }

  const payload = {
    firstName: author.firstName,
    lastName: author.lastName,
    created: author.created || fbTimestamp(),
    updated: fbTimestamp(),
  };

  const id = author.id;
  const docRef: FbDocRef = await db
    .collection('authors')
    .doc(id);
  await docRef.update(payload);
  const doc: FbDoc = await docRef.get();
  return authorModel.fromAPI(doc);
};

export default updateAuthorOnAPI;
