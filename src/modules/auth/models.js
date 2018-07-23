// @flow
import type {
  LoginErrors,
  LoginUser,
  PasswordReset,
  PasswordResetErrors,
  RegisterErrors,
  RegisterUser,
  User,
  UserWithMetadata,
} from './flowtypes';

export const userModel = {
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

  fromAPI(user: UserWithMetadata): User {
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

export const loginUserModel = {
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

export const registerUserModel = {
  empty(): RegisterUser {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
    };
  },

  emptyErrors(): RegisterErrors {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
    };
  },

  toAPI(data: RegisterUser): RegisterUser {
    return {
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    };
  },
};

export const passwordResetModel = {
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
