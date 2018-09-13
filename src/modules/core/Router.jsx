// @flow
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import type { ReactRoute } from './flowtypes'

import authRoutes from '../auth/routes'
import authorsRoutes from '../authors/routes'
import booksRoutes from '../books/routes'
import commonRoutes from './routes'

const routes: ReactRoute[] = [
  ...authRoutes,
  ...authorsRoutes,
  ...booksRoutes,
  ...commonRoutes, // must be last for 404 routing
]

const Router = () => (
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
)

export default Router
