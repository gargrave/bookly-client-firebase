//@flow
import type { Book, BookBucket } from '../flowtypes';

function bucketBooksByAuthor(books: Book[]): BookBucket[] {
  const buckets = {};

  books.forEach((book: Book) => {
    const author = `${book.author.firstName} ${book.author.lastName}`;
    if (author) {
      if (!(author in buckets)) {
        buckets[author] = [];
      }
      buckets[author].push(book);
    }
  });

  return Object.keys(buckets)
    .map((key) => ({
      author: key,
      books: buckets[key],
    })
  );
}

function filterBooksByTitle(books: Book[], filterString?: string = ''): Book[] {
  if (!filterString) {
    return books;
  }

  return books.filter((book: Book) => {
    const title = `${book.title}`.toLowerCase();
    return title.includes(filterString);
  });
}

function filterAndBucket(books: Book[], filterString?: string = ''): BookBucket[] {
  return bucketBooksByAuthor(filterBooksByTitle(books, filterString));
}

export {
  bucketBooksByAuthor,
  filterAndBucket,
  filterBooksByTitle,
};
