import HomePage from '../../connected/basic/HomePage';
import NotFoundPage from '../../connected/basic/NotFoundPage';

const routes = [
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
