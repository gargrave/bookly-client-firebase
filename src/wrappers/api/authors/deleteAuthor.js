// @flow
import type { Author, FbDocRef } from '../../../globals/flowtypes';

import { db } from '../../../globals/firebase/';
import { getDocRef } from '../../../globals/utils/apiHelpers';

import { getCurrentUserId } from '../../auth';

const deleteAuthorFromAPI = async (author: Author): Promise<?Author> => {
  const userId = getCurrentUserId();
  if (!userId) {
    return undefined;
  }

  const docRef: FbDocRef = await getDocRef(db, 'authors', author.id);
  return await docRef.delete();
};

export default deleteAuthorFromAPI;
