// @flow
import type { Profile, ProfileErrors } from './flowtypes'

export const profileModel = {
  empty(): Profile {
    return {
      firstName: '',
      lastName: '',
    }
  },

  emptyErrors(): ProfileErrors {
    return {
      firstName: '',
      lastName: '',
    }
  },

  editable(profile: Profile): Profile {
    return {
      created: profile.created,
      firstName: profile.firstName,
      id: profile.id,
      lastName: profile.lastName,
    }
  },

  toAPI(data: Profile): Profile {
    let payload: any = {
      firstName: data.firstName.trim() || '',
      lastName: data.lastName.trim() || '',
    }

    ;['id', 'created'].forEach(val => {
      if (data[val]) {
        payload[val] = data[val]
      }
    })

    return payload
  },

  fromAPI(profile: Profile): Profile {
    const { created, firstName, id, lastName, updated } = profile

    return {
      created,
      firstName,
      id,
      lastName,
      updated,
    }
  },
}
