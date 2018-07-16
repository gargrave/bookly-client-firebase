// @flow
import type { FbError } from '../../../modules/core/flowtypes';

import { APP } from '../../actionTypes';

const apiError = (err: FbError) => ({
    type: APP.API_ERROR,
    payload: {err},
});

export default apiError;
