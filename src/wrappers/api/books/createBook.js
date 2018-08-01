// @flow
import type { Author } from '../../../modules/authors/flowtypes';
import type { Book } from '../../../modules/books/flowtypes';
import type { FbDoc, FbDocRef } from '../../../wrappers/firebase/flowtypes';

import { db, fbTimestamp } from '../../firebase';
import { bookModel } from '../../../modules/books/models';

import { getCurrentUserId } from '../../auth';

const createBookOnAPI = async (book: Book, authors: Author[]): Promise<?Book> => {
  const userId = getCurrentUserId();
  if (!userId) {
    return undefined;
  }

  const payload = {
    owner: userId,
    created: fbTimestamp(),
    updated: fbTimestamp(),
    ...book,
  };

  const docRef: FbDocRef = await db
    .collection('books')
    .add(payload);
  const doc: FbDoc = await docRef.get();
  return bookModel.fromAPI(authors, doc.data());
};

export default createBookOnAPI;
