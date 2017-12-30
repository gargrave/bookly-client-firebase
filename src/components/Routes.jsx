import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AccountDetailPage from '../containers/account/AccountDetailPage';
import LoginPage from '../containers/account/LoginPage';

import AuthorCreatePage from '../containers/authors/AuthorCreatePage';
import AuthorDetailPage from '../containers/authors/AuthorDetailPage';
import AuthorsListPage from '../containers/authors/AuthorsListPage';

import HomePage from '../containers/basic/HomePage';
import NotFoundPage from '../containers/basic/NotFoundPage';

import BookCreatePage from '../containers/books/BookCreatePage';
import BookDetailPage from '../containers/books/BookDetailPage';
import BooksListPage from '../containers/books/BooksListPage';

import { localUrls } from '../constants/urls';

function routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path={localUrls.account} component={AccountDetailPage} />
      <Route exact path={localUrls.login} component={LoginPage} />
      <Route exact path={localUrls.authorsList} component={AuthorsListPage} />
      <Route exact path={`${localUrls.authorsList}/new`} component={AuthorCreatePage} />
      <Route exact path={`${localUrls.authorsList}/:id`} component={AuthorDetailPage} />
      <Route exact path={`${localUrls.booksList}/new`} component={BookCreatePage} />
      <Route exact path={`${localUrls.booksList}/:id`} component={BookDetailPage} />
      <Route exact path={localUrls.booksList} component={BooksListPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default routes;
