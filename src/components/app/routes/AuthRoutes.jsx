import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import AccountDetailPage from '../../connected/account/AccountDetailPage/AccountDetailPage';
import ConnectedPasswordResetPage from '../../connected/account/ConnectedPasswordResetPage/ConnectedPasswordResetPage';
import LoginPage from '../../connected/account/LoginPage/LoginPage';
import RegisterPage from '../../connected/account/RegisterPage/RegisterPage';

import { localUrls } from '../../../globals/urls';

const AuthRoutes = () => (
  <Fragment>
    <Route exact path={localUrls.account} component={AccountDetailPage} />
    <Route exact path={localUrls.login} component={LoginPage} />
    <Route exact path={localUrls.pwResetRequest} component={ConnectedPasswordResetPage} />
    <Route exact path={localUrls.register} component={RegisterPage} />
  </Fragment>
);

export default AuthRoutes;
