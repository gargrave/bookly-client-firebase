// @flow
import type { Author } from '../../../modules/authors/flowtypes'
import type { FbCollection } from '../../../wrappers/firebase/flowtypes'

import { db } from '../../firebase'
import { authorModel } from '../../../modules/authors/models'

import { getCurrentUserId } from '../../auth'
import { parseCollection } from '../../firebase/firestoreHelpers'

const fetchAuthorsFromAPI = async (): Promise<?(Author[])> => {
  const userId = getCurrentUserId()
  if (!userId) {
    return []
  }

  const query = db.collection('authors').where('owner', '==', userId)
  const results: FbCollection = await query.get()
  return parseCollection(results, authorModel.fromAPI)
}

export default fetchAuthorsFromAPI
