export function getTokenOrDie(getState) {
  const token = getState().auth.token;
  if (!token) {
    throw new Error('Authentication error. Please refresh and login again.');
  }
  return token;
}
