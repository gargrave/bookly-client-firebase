import { LoginErrors, LoginUser, User } from '../constants/flowtypes';

// @flow
const userModel = {
  empty(): User {
    return {
      displayName: '',
      email: '',
      emailVerified: false,
      id: '',
      lastLogin: '',
      registered: '',
    };
  },

  fromAPI(user) {
    const {
      displayName,
      email,
      emailVerified,
      uid,
    } = user;
    const {
      creationTime,
      lastSignInTime,
    } = user.metadata;

    return {
      displayName,
      email,
      emailVerified,
      id: uid,
      lastLogin: lastSignInTime,
      registered: creationTime,
    };
  },
};

const loginUserModel = {
  empty(): LoginUser {
    return {
      email: '',
      password: '',
    };
  },

  emptyErrors(): LoginErrors {
    return {
      email: '',
      password: '',
    };
  },

  toAPI(data: LoginUser): LoginUser {
    let payload: LoginUser = {
      email: data.email,
      password: data.password,
    };
    return payload;
  },
};

export {
  loginUserModel,
  userModel,
};
