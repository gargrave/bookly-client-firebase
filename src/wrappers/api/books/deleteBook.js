// @flow
import type { Book, FbDocRef } from '../../../globals/flowtypes';

import { db } from '../../../globals/firebase/';
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
