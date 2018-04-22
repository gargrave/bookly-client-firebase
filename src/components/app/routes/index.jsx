import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthRoutes from './AuthRoutes';
import AuthorRoutes from './AuthorRoutes';
import BaseRoutes from './BaseRoutes';
import BookRoutes from './BookRoutes';

const routes = [
  ...AuthRoutes,
  ...AuthorRoutes,
  ...BookRoutes,
  ...BaseRoutes, // must be last to provide 404 fallback
];

const Routes = () => (
  <Switch>
    {routes.map((route, i) => (
      <Route
        component={route.component}
        exact={route.exact}
        key={i}
        path={route.path}
      />
    ))}
  </Switch>
);

export default Routes;
