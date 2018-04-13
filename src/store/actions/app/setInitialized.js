import { APP } from '../../actionTypes';

const setInitialized = () =>
  async (dispatch) => {
    dispatch({ type: APP.INITIALIZED });
  };

export default setInitialized;
