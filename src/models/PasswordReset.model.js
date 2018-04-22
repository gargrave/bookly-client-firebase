// @flow
import type { PasswordReset, PasswordResetErrors } from '../globals/flowtypes';

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
