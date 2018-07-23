// @flow
import type { Book } from '../../../modules/books/flowtypes';
import type { FbDocRef } from '../../../modules/core/flowtypes';

import { db } from '../../firebase';
import { getDocRef } from '../../../globals/utils/apiHelpers';

import { getCurrentUserId } from '../../auth';

const deleteBookFromAPI = async (book: Book): Promise<?Book> => {
  const userId = getCurrentUserId();
  if (!userId) {
    return undefined;
  }

  const docRef: FbDocRef = await getDocRef(db, 'books', book.id);
  return await docRef.delete();
};

export default deleteBookFromAPI;
