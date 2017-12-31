function hydrateAuthor(authors, id) {
  const author = authors.find((a) => a.id === id);
  if (author) {
    return {
      name: `${author.firstName} ${author.lastName}`,
    };
  }
  return {
    name: '',
  };
}

const bookModel = {
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
      createdAt: data.created_at || data.created,
      updatedAt: data.updated_at || data.updated,
    };
  },

  fromDoc(doc, authors) {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      author: hydrateAuthor(authors, data.authorId),
      createdAt: data.created,
      updatedAt: data.updated,
    };
  },
};

export {
  bookModel,
};
