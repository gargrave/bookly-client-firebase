// @flow
import type { ReactRoute } from '../core/flowtypes'

import AuthorCreateContainer from './containers/AuthorCreateContainer/AuthorCreateContainer'
import AuthorDetailContainer from './containers/AuthorDetailContainer/AuthorDetailContainer'
import AuthorsListContainer from './containers/AuthorsListContainer/AuthorsListContainer'

import { localUrls } from '../../globals/urls'

const baseUrl = localUrls.authorsList

const routes: ReactRoute[] = [
  {
    component: AuthorCreateContainer,
    exact: true,
    path: `${baseUrl}/new`,
  },
  {
    component: AuthorDetailContainer,
    exact: true,
    path: `${baseUrl}/:id`,
  },
  {
    component: AuthorsListContainer,
    exact: true,
    path: baseUrl,
  },
]

export default routes
