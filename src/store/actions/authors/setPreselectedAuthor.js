// @flow
import type { Author } from '../../../constants/flowtypes';

import { AUTHORS } from '../../actionTypes';

const setPreselectedAuthor = (author: Author) => ({
  type: AUTHORS.SET_PRESELECTED,
  payload: { author },
});

export default setPreselectedAuthor;
