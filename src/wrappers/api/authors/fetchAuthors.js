// @flow
import type { Author, FbCollection, FbDoc } from '../../../globals/flowtypes';

import { db } from '../../../globals/firebase/';
import { authorModel } from '../../../models/Author.model';

import { getCurrentUserId } from '../../auth';

const fetchAuthorsFromAPI = async (): Promise<?Author[]> => {
  const userId = getCurrentUserId();
  if (!userId) {
    return [];
  }

  const query = db.collection('authors')
    .where('owner', '==', userId);
  const results: FbCollection = await query.get();
  return results.docs.map(
    (doc: FbDoc) => authorModel.fromAPI(doc)
  );
};

export default fetchAuthorsFromAPI;
