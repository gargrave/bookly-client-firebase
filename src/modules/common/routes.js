// @flow
import type { ReactRoute } from '../core/flowtypes';

import HomePage from '../../components/connected/basic/HomePage';
import NotFoundPage from '../../components/connected/basic/NotFoundPage';

const routes: ReactRoute[] = [
  {
    component: HomePage,
    exact: true,
    path: '/',
  },
  {
    component: NotFoundPage,
  },
];

export default routes;
