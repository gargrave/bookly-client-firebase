// @flow
import isEmail from 'validator/lib/isEmail';

import type { PasswordReset, PasswordResetErrors } from '../../globals/flowtypes';
import { validationErrors } from '../errors';

export const passwordResetHasAllFields = (data: PasswordReset) =>
  !!data.email;

export const validatePasswordReset = (data: PasswordReset): PasswordResetErrors => {
  const errors = {
    hasErrors: false,
    email: '',
  };
  const email = data.email;

  if (!email) {
    errors.hasErrors = true;
    errors.email = validationErrors.required;
  } else if (!isEmail(email)) {
    errors.hasErrors = true;
    errors.email = validationErrors.email;
  }

  return errors;
};