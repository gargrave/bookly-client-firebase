// @flow
import type { Author } from '../authors/flowtypes';
import type { FbDoc } from '../core/flowtypes';
import type { Book, BookErrors } from './flowtypes';

function hydrateAuthor(authors, id): Author {
  const author = authors.find((a) => a.id === id);
  return author || {
    firstName: '',
    lastName: '',
  };
}

export function refreshBookAuthor(book: Book, authors: Author[]) {
  book.author = hydrateAuthor(authors, book.author.id || book.authorId);
}

export const bookModel = {
  empty(): Book {
    return {
      author: {
        id: '',
        firstName: '',
        lastName: '',
      },
      title: '',
    };
  },

  emptyErrors(): BookErrors {
    return {
      title: '',
      author: '',
    };
  },

  editable(book: Book): Book {
    return {
      author: book.author,
      created: book.created,
      id: book.id,
      title: book.title.trim(),
    };
  },

  toAPI(data: Book): Book {
    let payload: any = {
      title: data.title.trim(),
      authorId: data.author.id,
    };

    ['id', 'created'].forEach((val) => {
      if (data[val]) {
        payload[val] = data[val];
      }
    });

    return payload;
  },

  fromAPI(doc: FbDoc, authors: Author[]): Book {
    const {
      title,
      authorId,
      created,
      updated,
    } = doc.data();

    return {
      id: doc.id,
      title,
      author: hydrateAuthor(authors, authorId),
      created,
      updated,
    };
  },
};
