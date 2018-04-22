// @flow
import type { Profile } from '../../globals/flowtypes';
import { validationErrors } from '../errors';

const MAX_LEN = 255;

const profileHasAllFields = (profile: Profile) => {
  return !!profile.firstName && !!profile.lastName;
};

const profilesMatch = (a: Profile, b: Profile): boolean => {
  if (a.firstName.trim() !== b.firstName.trim()) {
    return false;
  }
  if (a.lastName.trim() !== b.lastName.trim()) {
    return false;
  }
  return true;
};

const validateProfile = (data: Profile): Object => {
  const errors = {
    found: false,
    firstName: '',
    lastName: '',
  };
  const first = data.firstName;
  const last = data.lastName;

  if (typeof first !== 'string') {
    errors.found = true;
    errors.firstName = validationErrors.required;
  } else if (first.length > MAX_LEN) {
    errors.found = true;
    errors.firstName = validationErrors.maxLength(MAX_LEN);
  }

  if (typeof last !== 'string') {
    errors.found = true;
    errors.lastName = validationErrors.required;
  } else if (last.length > MAX_LEN) {
    errors.found = true;
    errors.lastName = validationErrors.maxLength(MAX_LEN);
  }

  return errors;
};

export {
  profileHasAllFields,
  profilesMatch,
  validateProfile,
};
