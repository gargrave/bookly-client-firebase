import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AccountDetailPage from './connected/account/AccountDetailPage';
import LoginPage from './connected/account/LoginPage';
import RegisterPage from './connected/account/RegisterPage';

import AuthorCreatePage from './connected/authors/AuthorCreatePage';
import AuthorDetailPage from './connected/authors/AuthorDetailPage';
import AuthorsListPage from './connected/authors/AuthorsListPage';

import HomePage from './connected/basic/HomePage';
import NotFoundPage from './connected/basic/NotFoundPage';

import BookCreatePage from './connected/books/BookCreatePage';
import BookDetailPage from './connected/books/BookDetailPage';
import BooksListPage from './connected/books/BooksListPage';

import { localUrls } from '../globals/urls';

const routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path={localUrls.account} component={AccountDetailPage} />
    <Route exact path={localUrls.login} component={LoginPage} />
    <Route exact path={localUrls.register} component={RegisterPage} />
    <Route exact path={localUrls.authorsList} component={AuthorsListPage} />
    <Route exact path={`${localUrls.authorsList}/new`} component={AuthorCreatePage} />
    <Route exact path={`${localUrls.authorsList}/:id`} component={AuthorDetailPage} />
    <Route exact path={`${localUrls.booksList}/new`} component={BookCreatePage} />
    <Route exact path={`${localUrls.booksList}/:id`} component={BookDetailPage} />
    <Route exact path={localUrls.booksList} component={BooksListPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default routes;
