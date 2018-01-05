// @flow
import type { Author, Book, BookErrors, FbDoc } from '../constants/flowtypes';

function hydrateAuthor(authors, id): Author {
  const author = authors.find((a) => a.id === id);
  return author || {
    firstName: '',
    lastName: '',
  };
}

function refreshBookAuthor(book: Book, authors: Author[]) {
  book.author = hydrateAuthor(authors, book.author.id || book.authorId);
}

const bookModel = {
  empty(): any {
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

  toAPI(data: Book): any {
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

export {
  bookModel,
  refreshBookAuthor,
};
