// @flow
import type { ReactRoute } from '../core/flowtypes';

import AuthorCreatePage from '../../components/connected/authors/AuthorCreatePage';
import AuthorDetailPage from '../../components/connected/authors/AuthorDetailPage';
import AuthorsListPage from '../../components/connected/authors/AuthorsListPage/AuthorsListPage';

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
