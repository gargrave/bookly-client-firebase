// @flow
import type { Author, Book, FbDoc, FbDocRef } from '../../../globals/flowtypes';

import { db, timestamp } from '../../../globals/firebase/';
import { bookModel } from '../../../models/Book.model';

import { getCurrentUserId } from '../../auth';

const createBookOnAPI = async (book: Book, authors: Author[]): Promise<?Book> => {
  const userId = getCurrentUserId();
  if (!userId) {
    return undefined;
  }

  const payload = {
    owner: userId,
    created: timestamp(),
    updated: timestamp(),
    ...book,
  };

  const docRef: FbDocRef = await db
    .collection('books')
    .add(payload);
  const doc: FbDoc = await docRef.get();
  return bookModel.fromAPI(doc, authors);
};

export default createBookOnAPI;
