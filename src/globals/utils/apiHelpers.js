// @flow
import type { FbDocRef } from '../flowtypes';

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
