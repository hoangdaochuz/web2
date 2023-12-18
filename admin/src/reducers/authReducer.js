import { SIGN_IN, SIGN_OUT, REFRESH_TOKEN } from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: false,
  jwt: null,
  refresh_token: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        jwt: action.payload.jwt,
        refresh_token: action.payload.refresh_token,
        user: action.payload.user,
      };
    case SIGN_OUT:
      return {
        ...state,
        jwt: null,
        refresh_token: null,
        isSignedIn: false,
        user: null,
      };
    case REFRESH_TOKEN:
      return { ...state, jwt: action.payload };
    default:
      return state;
  }
};
