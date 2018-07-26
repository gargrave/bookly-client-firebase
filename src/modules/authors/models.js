// @flow
import type { Author, AuthorErrors } from './flowtypes';

export const authorModel = {
  empty(): Author {
    return {
      firstName: '',
      lastName: '',
    };
  },

  emptyErrors(): AuthorErrors {
    return {
      firstName: '',
      lastName: '',
    };
  },

  editable(author: Author): Author {
    return {
      created: author.created,
      firstName: author.firstName,
      id: author.id,
      lastName: author.lastName,
    };
  },

  toAPI(data: Author): Author {
    let payload: any = {
      firstName: data.firstName.trim() || '',
      lastName: data.lastName.trim() || '',
    };

    ['id', 'created'].forEach((val) => {
      if (data[val]) {
        payload[val] = data[val];
      }
    });

    return payload;
  },

  fromAPI(author: Author): Author {
    const {
      created,
      firstName,
      id,
      lastName,
      updated,
    } = author;

    return {
      created,
      firstName,
      id,
      lastName,
      updated,
    };
  },
};
