// @flow
import type { ReactRoute } from '../core/flowtypes'

import BookCreateContainer from './containers/BookCreateContainer/BookCreateContainer'
import BookDetailContainer from './containers/BookDetailContainer/BookDetailContainer'
import BooksListContainer from './containers/BooksListContainer/BooksListContainer'

import { localUrls } from '../../globals/urls'

const baseUrl = localUrls.booksList

const routes: ReactRoute[] = [
  {
    component: BookCreateContainer,
    exact: true,
    path: `${baseUrl}/new`,
  },
  {
    component: BookDetailContainer,
    exact: true,
    path: `${baseUrl}/:id`,
  },
  {
    component: BooksListContainer,
    exact: true,
    path: baseUrl,
  },
]

export default routes
