// @flow
import type { Author } from '../../../modules/authors/flowtypes';
import type { FbCollection, FbDoc } from '../../../wrappers/firebase/flowtypes';

import { db } from '../../firebase';
import { authorModel } from '../../../modules/authors/models';

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
