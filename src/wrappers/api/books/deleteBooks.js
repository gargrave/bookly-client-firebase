// @flow
import type { FbCollection, FbDoc } from '../../../globals/flowtypes';

import { db } from '../../../globals/firebase/';

import { getCurrentUserId } from '../../auth';

const deleteBooksFromAPI = async (books: FbCollection): Promise<any> => {
  const userId = getCurrentUserId();
  if (!userId) {
    return undefined;
  }

  const batch = db.batch();
  books.docs.forEach(
    (doc: FbDoc) => batch.delete(doc.ref)
  );
  return await batch.commit();
};

export default deleteBooksFromAPI;
