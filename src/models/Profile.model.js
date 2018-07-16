// @flow
import type { FbDoc } from '../modules/core/flowtypes';
import type { Profile, ProfileErrors } from '../modules/profiles/flowtypes';

const profileModel = {
  empty(): any {
    return {
      firstName: '',
      lastName: '',
    };
  },

  emptyErrors(): ProfileErrors {
    return {
      firstName: '',
      lastName: '',
    };
  },

  editable(profile: Profile): Profile {
    return {
      created: profile.created,
      firstName: profile.firstName,
      id: profile.id,
      lastName: profile.lastName,
    };
  },

  toAPI(data: Profile): any {
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

  fromAPI(doc: FbDoc): Profile {
    const {
      created,
      firstName,
      lastName,
      updated,
    } = doc.data();

    return {
      created,
      firstName,
      id: doc.id,
      lastName,
      updated,
    };
  },
};

export default profileModel;
