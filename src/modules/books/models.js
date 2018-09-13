// @flow
import type { Author } from '../authors/flowtypes'
import type { Book, BookErrors } from './flowtypes'

const optionalFields = ['id', 'created']

function hydrateAuthor(authors, id): Author {
  const author = authors.find(a => a.id === id)
  return (
    author || {
      firstName: '',
      lastName: '',
    }
  )
}

export function refreshBookAuthor(book: Book, authors: Author[]) {
  book.author = hydrateAuthor(authors, book.author.id || book.authorId)
}

export const bookModel = {
  empty(): Book {
    return {
      author: {
        id: '',
        firstName: '',
        lastName: '',
      },
      sortBy: '',
      title: '',
    }
  },

  emptyErrors(): BookErrors {
    return {
      author: '',
      sortBy: '',
      title: '',
    }
  },

  editable(book: Book): Book {
    return {
      author: book.author,
      created: book.created,
      id: book.id,
      sortBy: (book.sortBy || '').trim(),
      title: book.title.trim(),
    }
  },

  toAPI(data: Book): Book {
    let payload: any = {
      authorId: data.author.id,
      sortBy: (data.sortBy || '').trim(),
      title: data.title.trim(),
    }

    optionalFields.forEach(val => {
      if (data[val]) {
        payload[val] = data[val]
      }
    })

    return payload
  },

  fromAPI(authors: Author[], book: Book): Book {
    const { authorId, created, id, sortBy, title, updated } = book

    return {
      author: hydrateAuthor(authors, authorId),
      created,
      id,
      sortBy,
      title,
      updated,
    }
  },
}
