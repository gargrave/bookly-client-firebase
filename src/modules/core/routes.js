// @flow
import type { ReactRoute } from './flowtypes'

import HomePage from './components/HomePage/HomePage'
import NotFoundPage from './components/NotFoundPage/NotFoundPage'

const routes: ReactRoute[] = [
  {
    component: HomePage,
    exact: true,
    path: '/',
  },
  {
    component: NotFoundPage,
  },
]

export default routes
