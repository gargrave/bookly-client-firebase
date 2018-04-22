import BookCreatePage from '../../connected/books/BookCreatePage';
import BookDetailPage from '../../connected/books/BookDetailPage';
import BooksListPage from '../../connected/books/BooksListPage/BooksListPage';

import { localUrls } from '../../../globals/urls';

const baseUrl = localUrls.booksList;

const routes = [
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
