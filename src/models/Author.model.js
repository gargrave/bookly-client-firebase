const AuthorModel = {
  empty() {
    return {
      firstName: '',
      lastName: '',
    };
  },

  toAPI(data) {
    let payload = {
      firstName: data.firstName.trim() || '',
      lastName: data.lastName.trim() || '',
    };

    if (data.id) {
      payload.id = data.id;
    }

    return payload;
  },

  fromAPI(data) {
    return {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },
};

export default AuthorModel;
