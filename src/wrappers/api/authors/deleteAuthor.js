// @flow
import type { Author } from '../../../modules/authors/flowtypes'
import type { FbDocRef } from '../../../wrappers/firebase/flowtypes'

import { db } from '../../firebase'
import { getDocRef } from '../../../wrappers/firebase/firestoreHelpers'

import { getCurrentUserId } from '../../auth'

const deleteAuthorFromAPI = async (author: Author): Promise<?Author> => {
  const userId = getCurrentUserId()
  if (!userId) {
    return undefined
  }

  const docRef: FbDocRef = await getDocRef(db, 'authors', author.id)
  return await docRef.delete()
}

export default deleteAuthorFromAPI
