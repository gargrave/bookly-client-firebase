// @flow
import type { Book } from '../../../modules/books/flowtypes';
import type { FbDocRef } from '../../../wrappers/firebase/flowtypes';

import { db } from '../../firebase';
import { getDocRef } from '../../../wrappers/firebase/firestoreHelpers';

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
