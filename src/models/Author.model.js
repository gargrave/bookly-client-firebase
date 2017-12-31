// @flow
import type { Author, FbDoc } from '../constants/flowtypes';

const authorModel = {
  empty(): any {
    return {
      firstName: '',
      lastName: '',
    };
  },

  toAPI(data: any): any {
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

  fromFbDoc(doc: FbDoc): Author {
    const {
      firstName,
      lastName,
      created,
      updated,
    } = doc.data();

    return {
      id: doc.id,
      firstName,
      lastName,
      created,
      updated,
    };
  },
};

export {
  authorModel,
};
