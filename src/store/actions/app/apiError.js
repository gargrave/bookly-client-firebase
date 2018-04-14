// @flow
import type { FbError } from '../../../globals/flowtypes';

import { APP } from '../../actionTypes';

const apiError = (err: FbError) => ({
    type: APP.API_ERROR,
    payload: {err},
});

export default apiError;
