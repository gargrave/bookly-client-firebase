import { APP } from '../action-types';

const defaultState = {
  initialized: false,
};

export default function app(state = defaultState, action) {
  switch (action.type) {
    case APP.INITIALIZED:
      return {
        initialized: true,
      };

    default:
      return state;
  }
}
