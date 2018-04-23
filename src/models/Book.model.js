// @flow
import type { Author, Book, BookErrors, FbDoc } from '../globals/flowtypes';

import { toUnixMs, toUnixTimestamp } from '../globals/utils/dateHelpers';

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
      finishedOn: book.finishedOn || 0,
      startedOn: book.startedOn || 0,
    };
  },

  toAPI(data: Book): any {
    let payload: any = {
      title: data.title.trim(),
      authorId: data.author.id,
      finishedOn: toUnixTimestamp(data.finishedOn, 0),
      startedOn: toUnixTimestamp(data.startedOn, 0),
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
    const finishedOn = toUnixMs(data.finishedOn);
    const startedOn = toUnixMs(data.startedOn);

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
