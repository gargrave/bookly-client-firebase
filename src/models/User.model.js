const userModel = {
  empty() {
    return {
      displayName: '',
      email: '',
      emailVerified: false,
      id: '',
      lastLogin: '',
      registered: '',
    };
  },

  emptyErrors() {
    return {
      email: '',
      password: '',
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

export {
  userModel,
};
