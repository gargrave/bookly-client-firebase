// @flow
import type { Author } from '../../../modules/authors/flowtypes'
import type { Book } from '../../../modules/books/flowtypes'
import type { FbDoc, FbDocRef } from '../../../wrappers/firebase/flowtypes'

import { db, fbTimestamp } from '../../firebase'
import { bookModel } from '../../../modules/books/models'
import { parseFbDoc } from '../../firebase/firestoreHelpers'

import { getCurrentUserId } from '../../auth'

const updateBookOnAPI = async (
  book: Book,
  authors: Author[],
): Promise<?Book> => {
  const userId = getCurrentUserId()
  if (!userId) {
    return undefined
  }

  const payload = {
    authorId: book.authorId,
    created: book.created || fbTimestamp(),
    sortBy: book.sortBy || '',
    title: book.title,
    updated: fbTimestamp(),
  }

  const id = book.id
  const docRef: FbDocRef = await db.collection('books').doc(id)
  await docRef.update(payload)
  const doc: FbDoc = await docRef.get()
  return bookModel.fromAPI(authors, parseFbDoc(doc))
}

export default updateBookOnAPI
