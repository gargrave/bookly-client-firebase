// @flow
import type { FbDocRef } from '../../modules/core/flowtypes';

async function getDocRef(
  db: any,
  table: string,
  id: string,
): FbDocRef {
  return db.collection(table).doc(id);
}

export {
  getDocRef,
};
