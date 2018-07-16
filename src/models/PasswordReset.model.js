// @flow
import type { PasswordReset, PasswordResetErrors } from '../modules/auth/flowtypes';

const passwordResetModel = {
  empty(): PasswordReset {
    return {
      email: '',
    };
  },

  emptyErrors(): PasswordResetErrors {
    return {
      email: '',
    };
  },
};

export default passwordResetModel;
