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
      firstName: data.first_name || data.firstName,
      lastName: data.last_name || data.lastName,
      createdAt: data.created_at || data.created,
      updatedAt: data.updated_at || data.updated,
    };
  },
};

export default AuthorModel;
