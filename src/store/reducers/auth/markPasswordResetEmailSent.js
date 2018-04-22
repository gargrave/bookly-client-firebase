import { AUTH } from '../../actionTypes';

const markPasswordResetEmailSentReducer = (state, action) => {
  console.log('%cmark sent 1', 'color: pink;font-size: 12px;background:#454;padding:2px 4px;');
  if (action.type !== AUTH.PASSWORD_RESET_EMAIL_SENT) {
    return state;
  }

  console.log('%cmark sent 2', 'color: pink;font-size: 12px;background:#454;padding:2px 4px;');
  return {
    ...state,
    passwordResetEmailSentTo: action.payload.email,
  };
};

export default markPasswordResetEmailSentReducer;
