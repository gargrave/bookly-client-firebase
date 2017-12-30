// @flow
import { validationErrors } from './validationErrors';

const API_RE_REQUIRED = /\["(\w+)" is not allowed to be empty\]/;
const API_RE_LENGTH = /\["(\w+)" length must be at least (\d) characters long\]/;
const API_RE_EMAIL_FORMAT = /\["(\w+)" must be a valid email\]/;

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

function parseError(err: Object): string {
  if (err.response && err.response.data) {
    return err.response.data;
  } else if (err.message) {
    return simplifyApiError(err.message);
  }
  return 'An uknown error occurred.';
}

export {
  parseError,
};
