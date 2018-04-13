import login from './auth/login';
import logout from './auth/logout';
import register from './auth/register';
import setLocalUserData from './auth/setLocalUserData';

import clearPreselectedAuthor from './authors/clearPreselectedAuthor';
import createAuthor from './authors/createAuthor';
import deleteAuthor from './authors/deleteAuthor';
import fetchAuthors from './authors/fetchAuthors';
import setPreselectedAuthor from './authors/setPreselectedAuthor';
import updateAuthor from './authors/updateAuthor';

import createBook from './books/createBook';
import deleteBook from './books/deleteBook';
import deleteBooksByAuthor from './books/deleteBooksByAuthor';
import fetchBooks from './books/fetchBooks';
import refreshBooksByAuthor from './books/refreshBooksByAuthor';
import updateBook from './books/updateBook';

export {
  login,
  logout,
  register,
  setLocalUserData,

  clearPreselectedAuthor,
  createAuthor,
  deleteAuthor,
  fetchAuthors,
  setPreselectedAuthor,
  updateAuthor,

  createBook,
  deleteBook,
  deleteBooksByAuthor,
  fetchBooks,
  refreshBooksByAuthor,
  updateBook,
};
