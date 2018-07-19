// @flow
import type { ReactRoute } from '../core/flowtypes';

import AccountDetailContainer from './containers/AccountDetailContainer/AccountDetailContainer';
import LoginContainer from './containers/LoginContainer/LoginContainer';
import PasswordResetContainer from './containers/PasswordResetContainer/PasswordResetContainer';
import RegisterContainer from './containers/RegisterContainer/RegisterContainer';

import { localUrls } from '../../globals/urls';

const routes: ReactRoute[] = [
  {
    component: AccountDetailContainer,
    exact: true,
    path: localUrls.account,
  },
  {
    component: LoginContainer,
    exact: true,
    path: localUrls.login,
  },
  {
    component: PasswordResetContainer,
    exact: true,
    path: localUrls.pwResetRequest,
  },
  {
    component: RegisterContainer,
    exact: true,
    path: localUrls.register,
  },
];

export default routes;
