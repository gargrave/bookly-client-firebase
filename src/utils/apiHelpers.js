// @flow
import type { FbDocRef, FbError } from '../constants/flowtypes';

import { APP } from '../store/actionTypes';

async function getDocRef(
  db: any,
  table: string,
  id: string,
): FbDocRef {
  return db.collection(table).doc(id);
}

function apiErrorAction(err: FbError) {
  return {
    type: APP.API_ERROR,
    payload: {
      err,
    },
  };
}

export {
  apiErrorAction,
  getDocRef,
};
