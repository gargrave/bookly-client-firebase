import React from 'react';
import { Switch } from 'react-router-dom';

import AuthRoutes from './AuthRoutes';
import AuthorRoutes from './AuthorRoutes';
import BaseRoutes from './BaseRoutes';
import BookRoutes from './BookRoutes';

const Routes = () => (
  <Switch>
    <AuthRoutes />
    <BaseRoutes />
    <AuthorRoutes />
    <BookRoutes />
  </Switch>
);

export default Routes;
