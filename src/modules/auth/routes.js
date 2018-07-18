// @flow
import type { ReactRoute } from '../core/flowtypes';

import AccountDetailPage from './containers/AccountDetailPage/AccountDetailPage';
import ConnectedPasswordResetPage from './containers/ConnectedPasswordResetPage/ConnectedPasswordResetPage';
import LoginPage from './containers/LoginPage/LoginPage';
import RegisterPage from './containers/RegisterPage/RegisterPage';

import { localUrls } from '../../globals/urls';

const routes: ReactRoute[] = [
  {
    component: AccountDetailPage,
    exact: true,
    path: localUrls.account,
  },
  {
    component: LoginPage,
    exact: true,
    path: localUrls.login,
  },
  {
    component: ConnectedPasswordResetPage,
    exact: true,
    path: localUrls.pwResetRequest,
  },
  {
    component: RegisterPage,
    exact: true,
    path: localUrls.register,
  },
];

export default routes;
