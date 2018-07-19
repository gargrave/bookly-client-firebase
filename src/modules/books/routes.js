// @flow
import type { ReactRoute } from '../core/flowtypes';

import BookCreatePage from './containers/BookCreatePage/BookCreatePage';
import BookDetailPage from './containers/BookDetailPage/BookDetailPage';
import BooksListPage from './containers/BooksListPage/BooksListPage';

import { localUrls } from '../../globals/urls';

const baseUrl = localUrls.booksList;

const routes: ReactRoute[] = [
  {
    component: BookCreatePage,
    exact: true,
    path: `${baseUrl}/new`,
  },
  {
    component: BookDetailPage,
    exact: true,
    path: `${baseUrl}/:id`,
  },
  {
    component: BooksListPage,
    exact: true,
    path: baseUrl,
  },
];

export default routes;
