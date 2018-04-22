import ConnectedBookCreatePage from '../../connected/books/ConnectedBookCreatePage/ConnectedBookCreatePage';
import BookDetailPage from '../../connected/books/BookDetailPage';
import BooksListPage from '../../connected/books/BooksListPage/BooksListPage';

import { localUrls } from '../../../globals/urls';

const baseUrl = localUrls.booksList;

const routes = [
  {
    component: ConnectedBookCreatePage,
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
