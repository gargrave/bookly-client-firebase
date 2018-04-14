// @flow
import { format } from 'date-fns';

import type { User } from '../../../../globals/flowtypes';

export const userBasicDetailsTextList = (user: User) => {
  const {
    email,
    emailVerified,
  } = user;

  return [
    { title: 'Email', value: email },
    { title: 'Verified', value: `${emailVerified}` },
  ];
};

export const userRegDetailsTextList = (user: User) => {
  const {
    lastLogin,
    registered,
  } = user;

  return [
    { title: 'Registered', value: format(registered, 'MMM. DD, YYYY, HH:mm:ss') },
    { title: 'Last login', value: format(lastLogin, 'MMM. DD, YYYY, HH:mm:ss') },
  ];
};
