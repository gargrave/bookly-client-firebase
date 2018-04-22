import AuthorCreatePage from '../../connected/authors/AuthorCreatePage';
import AuthorDetailPage from '../../connected/authors/AuthorDetailPage';
import AuthorsListPage from '../../connected/authors/AuthorsListPage/AuthorsListPage';

import { localUrls } from '../../../globals/urls';

const baseUrl = localUrls.authorsList;

const routes = [
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
