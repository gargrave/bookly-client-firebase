// @flow
import type { ReactRoute } from '../core/flowtypes';

import AccountDetailPage from '../../components/connected/account/AccountDetailPage/AccountDetailPage';
import ConnectedPasswordResetPage from '../../components/connected/account/ConnectedPasswordResetPage/ConnectedPasswordResetPage';
import LoginPage from '../../components/connected/account/LoginPage/LoginPage';
import RegisterPage from '../../components/connected/account/RegisterPage/RegisterPage';

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
