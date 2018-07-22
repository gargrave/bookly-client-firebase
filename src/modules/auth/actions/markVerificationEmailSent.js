// @flow
import types from './types';

export const markVerificationEmailSent = () => ({
  type: types.VERIFICATION_EMAIL_SENT,
});

export const markVerificationEmailSentReducer =
  (state: any) => ({
    ...state,
    verificationEmailSent: true,
  });
