// @flow
import type { Author, Book, FbCollection, FbDoc } from '../../../globals/flowtypes';

import { db } from '../../../globals/firebase/';
import { bookModel } from '../../../models/Book.model';

import { getCurrentUserId } from '../../auth';

const fetchBooksFromAPI = async (authors: Author[]): Promise<?Book[]> => {
  const userId = getCurrentUserId();
  if (!userId) {
    return [];
  }

  const query = db
    .collection('books')
    .where('owner', '==', userId);
  const results: FbCollection = await query.get();
  return results.docs.map(
    (doc: FbDoc) => bookModel.fromAPI(doc, authors)
  );
};

export default fetchBooksFromAPI;
