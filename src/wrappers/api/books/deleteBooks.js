// @flow
import type { FbCollection, FbDoc } from '../../../modules/core/flowtypes';

import { db } from '../../firebase';

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
