// @flow
import type { Author, Book, FbDoc, FbDocRef } from '../../../globals/flowtypes';

import { db, fbTimestamp } from '../../../globals/firebase/';
import { bookModel } from '../../../models/Book.model';

import { getCurrentUserId } from '../../auth';

const updateBookOnAPI = async (book: Book, authors: Author[]): Promise<?Book> => {
  const userId = getCurrentUserId();
  if (!userId) {
    return undefined;
  }

  const payload = {
    title: book.title,
    authorId: book.authorId,
    created: book.created || fbTimestamp(),
    updated: fbTimestamp(),
    startedOn: book.startedOn,
    finishedOn: book.finishedOn,
  };

  const id = book.id;
  const docRef: FbDocRef = await db
    .collection('books')
    .doc(id);
  await docRef.update(payload);
  const doc: FbDoc = await docRef.get();
  return bookModel.fromAPI(doc, authors);
};

export default updateBookOnAPI;
