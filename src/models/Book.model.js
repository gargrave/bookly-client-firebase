// @flow
import type { Author, Book, FbDoc } from '../constants/flowtypes';

function hydrateAuthor(authors, id) {
  const author = authors.find((a) => a.id === id);
  return author || {
    firstName: '',
    lastName: '',
  };
}

const bookModel = {
  empty(): any {
    return {
      title: '',
      author: {
        id: -1,
        firstName: '',
        lastName: '',
      },
    };
  },

  emptyErrors(): any {
    return {
      title: '',
      author: '',
    };
  },

  toAPI(data: any): any {
    let payload: any = {
      title: data.title || '',
      authorId: data.author.id,
    };

    ['id', 'created'].forEach((val) => {
      if (data[val]) {
        payload[val] = data[val];
      }
    });

    return payload;
  },

  fromDoc(doc: FbDoc, authors: Author[]): Book {
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
};
