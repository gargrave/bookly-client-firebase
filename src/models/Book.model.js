// @flow
import type { Author, Book, BookErrors, FbDoc } from '../globals/flowtypes';

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
  empty(): Book {
    return {
      author: {
        id: '',
        firstName: '',
        lastName: '',
      },
      finishedOn: '',
      startedOn: '',
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
      finishedOn: book.finishedOn || null,
      startedOn: book.startedOn || null,
    };
  },

  toAPI(data: Book): any {
    let payload: any = {
      title: data.title.trim(),
      authorId: data.author.id,
      finishedOn: (data.finishedOn && data.finishedOn.unix()) || 0,
      startedOn: (data.startedOn && data.startedOn.unix()) || 0,
    };

    ['id', 'created'].forEach((val) => {
      if (data[val]) {
        payload[val] = data[val];
      }
    });

    return payload;
  },

  fromAPI(doc: FbDoc, authors: Author[]): Book {
    const data = doc.data();
    const {
      title,
      authorId,
      created,
      updated,
    } = data;
    const finishedOn = (data.finishedOn && data.finishedOn * 1000) || null;
    const startedOn = (data.startedOn && data.startedOn * 1000) || null;

    return {
      id: doc.id,
      author: hydrateAuthor(authors, authorId),
      created,
      finishedOn,
      startedOn,
      title,
      updated,
    };
  },
};

export {
  bookModel,
  refreshBookAuthor,
};
