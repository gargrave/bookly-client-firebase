// @flow
import type { ReactRoute } from '../core/flowtypes';

import AuthorCreatePage from './containers/AuthorCreatePage/AuthorCreatePage';
import AuthorDetailPage from './containers/AuthorDetailPage/AuthorDetailPage';
import AuthorsListPage from './containers/AuthorsListPage/AuthorsListPage';

import { localUrls } from '../../globals/urls';

const baseUrl = localUrls.authorsList;

const routes: ReactRoute[] = [
  {
    component: AuthorCreatePage,
    exact: true,
    path: `${baseUrl}/new`,
  },
  {
    component: AuthorDetailPage,
    exact: true,
    path: `${baseUrl}/:id`,
  },
  {
    component: AuthorsListPage,
    exact: true,
    path: baseUrl,
  },
];

export default routes;
