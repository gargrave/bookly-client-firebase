// @flow
import type { Author } from '../../../modules/authors/flowtypes';
import type { FbDocRef } from '../../../modules/core/flowtypes';

import { db } from '../../firebase';
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
