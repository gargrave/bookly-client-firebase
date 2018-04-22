import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import BookCreatePage from '../../connected/books/BookCreatePage';
import BookDetailPage from '../../connected/books/BookDetailPage';
import BooksListPage from '../../connected/books/BooksListPage/BooksListPage';

import { localUrls } from '../../../globals/urls';

const BookRoutes = () => (
  <Fragment>
    <Route exact path={`${localUrls.booksList}/new`} component={BookCreatePage} />
    <Route exact path={`${localUrls.booksList}/:id`} component={BookDetailPage} />
    <Route exact path={localUrls.booksList} component={BooksListPage} />
  </Fragment>
);

export default BookRoutes;
