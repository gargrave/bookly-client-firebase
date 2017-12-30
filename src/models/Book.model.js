const BookModel = {
  empty() {
    return {
      title: '',
      author: {
        id: -1,
        name: '',
      },
    };
  },

  emptyErrors() {
    return {
      title: '',
      author: '',
    };
  },

  toAPI(data) {
    let payload = {
      title: data.title || '',
      authorId: data.author.id,
    };

    if (data.id) {
      payload.id = data.id;
    }

    return payload;
  },

  fromAPI(data) {
    return {
      id: data.id,
      title: data.title,
      author: data.author,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },
};

export default BookModel;
