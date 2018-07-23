// @flow
import type { Author } from '../../../modules/authors/flowtypes';
import type { Book } from '../../../modules/books/flowtypes';
import type { FbCollection, FbDoc } from '../../../wrappers/firebase/flowtypes';

import { db } from '../../firebase';
import { bookModel } from '../../../modules/books/models';

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
