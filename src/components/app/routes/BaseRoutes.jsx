import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import HomePage from '../../connected/basic/HomePage';
import NotFoundPage from '../../connected/basic/NotFoundPage';

const BaseRoutes = () => (
  <Fragment>
    <Route exact path="/" component={HomePage} />
    <Route component={NotFoundPage} />
  </Fragment>
);

export default BaseRoutes;
