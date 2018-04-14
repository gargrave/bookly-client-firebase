// @flow
import type { Author, FbDoc, FbDocRef } from '../../../globals/flowtypes';

import { db, timestamp } from '../../../globals/firebase/';
import { authorModel } from '../../../models/Author.model';

import { getCurrentUserId } from '../../auth';

const updateAuthorOnAPI = async (author: Author): Promise<?Author> => {
  const userId = getCurrentUserId();
  if (!userId) {
    return undefined;
  }

  const payload = {
    firstName: author.firstName,
    lastName: author.lastName,
    created: author.created || timestamp(),
    updated: timestamp(),
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
