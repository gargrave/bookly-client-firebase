// @flow
import { AUTH } from '../../actionTypes';

const markPasswordResetEmailSent = (email: string) => ({
  type: AUTH.PASSWORD_RESET_EMAIL_SENT,
  payload: { email },
});

export default markPasswordResetEmailSent;
