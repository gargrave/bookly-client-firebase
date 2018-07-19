// @flow
import { format } from 'date-fns';

import type { User } from '../../flowtypes';
import type { Profile } from '../../../profiles/flowtypes';

export const userBasicDetailsTextList = (user: User, profile: Profile) => {
  const {
    email,
    emailVerified,
  } = user;
  const {
    firstName,
    lastName,
  } = profile;

  const nameStr = `${firstName} ${lastName}`;
  const verifiedStr = emailVerified ? '' : ' (unverified)';
  const emailStr = `${email}${verifiedStr}`;

  return [
    { title: 'Name', value: nameStr },
    { title: 'Email', value: emailStr },
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
