// @flow
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'

import type { RegisterErrors, RegisterUser } from '../flowtypes'

import { validationErrors } from '../../../globals/errors'

export function registerUserHasAllFields(registerUser: RegisterUser) {
  return (
    !!registerUser.email &&
    !!registerUser.password &&
    !!registerUser.passwordConfirm
  )
}

export function validateRegisterUser(data: RegisterUser): RegisterErrors {
  const errors = {
    found: false,
    email: '',
    password: '',
    passwordConfirm: '',
  }
  const email = data.email
  const password = data.password
  const passwordConfirm = data.passwordConfirm

  if (!email) {
    errors.found = true
    errors.email = validationErrors.required
  } else if (!isEmail(email)) {
    errors.found = true
    errors.email = validationErrors.email
  }

  if (!password) {
    errors.found = true
    errors.password = validationErrors.required
  } else if (!isLength(password, { min: 8 })) {
    errors.found = true
    errors.password = validationErrors.length(8)
  }

  if (!passwordConfirm) {
    errors.found = true
    errors.passwordConfirm = validationErrors.passwords
  } else if (password !== passwordConfirm) {
    errors.found = true
    errors.passwordConfirm = validationErrors.passwords
  }

  return errors
}
