import { AUTH } from '../../actionTypes';

const markVerificationEmailSent = () => ({
  type: AUTH.VERIFICATION_EMAIL_SENT,
});

export default markVerificationEmailSent;
