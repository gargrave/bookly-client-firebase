// @flow
import type { FbError } from '../../constants/flowtypes';

import { validationErrors } from './validationErrors';

const API_RE_REQUIRED = /\["(\w+)" is not allowed to be empty\]/;
const API_RE_LENGTH = /\["(\w+)" length must be at least (\d) characters long\]/;
const API_RE_EMAIL_FORMAT = /\["(\w+)" must be a valid email\]/;

/* eslint-disable no-unused-vars */
function simplifyApiError(msg: string): string {
  // 'required field' API errors
  let m = msg.match(API_RE_REQUIRED);
  if (m && m.length && m.length > 1) {
    return validationErrors.requiredWithName(m[1]);
  }

  // 'required length' API errors
  m = msg.match(API_RE_LENGTH);
  if (m && m.length && m.length > 2) {
    return validationErrors.lengthWithName(m[1], m[2]);
  }

  // 'must be email' API errors
  m = msg.match(API_RE_EMAIL_FORMAT);
  if (m && m.length && m.length > 1) {
    return validationErrors.emailWithName(m[1]);
  }

  return `Unknown API error: ${msg}`;
}

function parseFbError(err: FbError): string {
  // TODO: make better use of Firebase's error structure
  // https://firebase.google.com/docs/reference/js/firebase.auth.Auth?authuser=0#signInAndRetrieveDataWithEmailAndPassword
  // e.g. if auth/wrong-password, show an error on password field
  if (err.message) {
    return `Error: ${err.message}`;
  }
  return 'Error: An unkonwn error occurred! :(';
}

export {
  parseFbError,
};
