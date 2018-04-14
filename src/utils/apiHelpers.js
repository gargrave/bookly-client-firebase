// @flow
import type { FbDocRef } from '../globals/flowtypes';

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
