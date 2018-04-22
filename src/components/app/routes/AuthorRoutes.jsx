import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import AuthorCreatePage from '../../connected/authors/AuthorCreatePage';
import AuthorDetailPage from '../../connected/authors/AuthorDetailPage';
import AuthorsListPage from '../../connected/authors/AuthorsListPage/AuthorsListPage';

import { localUrls } from '../../../globals/urls';

const AuthorRoutes = () => (
  <Fragment>
    <Route exact path={localUrls.authorsList} component={AuthorsListPage} />
    <Route exact path={`${localUrls.authorsList}/new`} component={AuthorCreatePage} />
    <Route exact path={`${localUrls.authorsList}/:id`} component={AuthorDetailPage} />
  </Fragment>
);

export default AuthorRoutes;
