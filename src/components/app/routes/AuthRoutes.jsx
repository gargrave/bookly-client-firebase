import AccountDetailPage from '../../connected/account/AccountDetailPage/AccountDetailPage';
import ConnectedPasswordResetPage from '../../connected/account/ConnectedPasswordResetPage/ConnectedPasswordResetPage';
import LoginPage from '../../connected/account/LoginPage/LoginPage';
import RegisterPage from '../../connected/account/RegisterPage/RegisterPage';

import { localUrls } from '../../../globals/urls';

const routes = [
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
