// @flow
import type { Author } from '../../../modules/authors/flowtypes'
import type { FbCollection } from '../../../wrappers/firebase/flowtypes'

import { db } from '../../firebase'

import { getCurrentUserId } from '../../auth'

const fetchBooksByAuthorFromAPI = async (
  author: Author,
): Promise<?FbCollection> => {
  const userId = getCurrentUserId()
  if (!userId) {
    return undefined
  }

  const query = await db
    .collection('books')
    .where('owner', '==', userId)
    .where('authorId', '==', author.id)
  return await query.get()
}

export default fetchBooksByAuthorFromAPI
