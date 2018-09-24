// @flow
import type { Author } from '../../modules/authors/flowtypes'
import type { Book } from '../../modules/books/flowtypes'

export const bookHasValidAuthor = (book: Book, authors: Author[]) =>
  authors.find((author: Author) => author.id === book.authorId)

const filterTitle = (str: string): string =>
  str.toLowerCase().startsWith('the ') ? str.substring(4) : str

const sortByTitle = (a: Book, b: Book) =>
  filterTitle(a.title) > filterTitle(b.title) ? 1 : -1

const getBookHash = (books: Book[]) =>
  books.reduce((acc: Object, book: Book) => {
    const author = book.author.lastName || ''
    const sortKey = book.sortBy || ''
    const authorBucket = acc[author] || {}
    const newAuthorSortKeyBucket = (authorBucket[sortKey] || []).concat(book)
    const newAuthorBucket = {
      ...authorBucket,
      [sortKey]: newAuthorSortKeyBucket,
    }

    return {
      ...acc,
      [author]: newAuthorBucket,
    }
  }, {})

export function sortBooks(books: Book[]) {
  const bookHash = getBookHash(books)
  const sortedBooks: Book[] = []
  const sortedAuthors: string[] = Object.keys(bookHash).sort()

  sortedAuthors.forEach((author: string) => {
    const authorBucket = bookHash[author]
    const authorSortKeys = Object.keys(authorBucket).sort()
    authorSortKeys.forEach(sortKey => {
      sortedBooks.push(...authorBucket[sortKey].sort(sortByTitle))
    })
  })

  return sortedBooks
}
