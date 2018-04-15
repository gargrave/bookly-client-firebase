import { AUTH } from '../../actionTypes';

const sendVerifyEmailReducer = (state, action) => {
  if (action.type !== AUTH.VERIFICATION_EMAIL_SENT) {
    return state;
  }

  return {
    ...state,
    verificationEmailSent: true,
  };
};

export default sendVerifyEmailReducer;
