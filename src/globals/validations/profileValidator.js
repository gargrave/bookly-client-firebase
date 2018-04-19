// @flow
import type { Profile } from '../../globals/flowtypes';
import { validationErrors } from '../errors';

function profileHasAllFields(profile: Profile) {
  return !!profile.firstName && !!profile.lastName;
}

function profilesMatch(a: Profile, b: Profile): boolean {
  if (a.firstName.trim() !== b.firstName.trim()) {
    return false;
  }
  if (a.lastName.trim() !== b.lastName.trim()) {
    return false;
  }
  return true;
}

function validateProfile(data: Profile): Object {
  const errors = {
    found: false,
    firstName: '',
    lastName: '',
  };
  const first = data.firstName;
  const last = data.lastName;

  if (!first) {
    errors.found = true;
    errors.firstName = validationErrors.required;
  }

  if (!last) {
    errors.found = true;
    errors.lastName = validationErrors.required;
  }

  return errors;
}

export {
  profileHasAllFields,
  profilesMatch,
  validateProfile,
};
