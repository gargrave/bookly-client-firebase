// @flow
import type { Author } from '../../../modules/authors/flowtypes'
import type { Book } from '../../../modules/books/flowtypes'
import type { FbCollection } from '../../../wrappers/firebase/flowtypes'

import { db } from '../../firebase'
import { bookModel } from '../../../modules/books/models'

import { getCurrentUserId } from '../../auth'
import { parseCollection } from '../../firebase/firestoreHelpers'

const fetchBooksFromAPI = async (authors: Author[]): Promise<?(Book[])> => {
  const userId = getCurrentUserId()
  if (!userId) {
    return []
  }

  const query = db.collection('books').where('owner', '==', userId)
  const results: FbCollection = await query.get()
  return parseCollection(results, bookModel.fromAPI.bind(null, authors))
}

export default fetchBooksFromAPI
