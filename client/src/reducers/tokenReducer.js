import {
  GET_TOKEN,
  SET_TOKEN,
  TOKEN_LOADING,
  TOKEN_SIGN_DATA,
} from "../actions/types.js";

const initialState = {
  sign: {},
  token: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOKEN_LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_TOKEN:
      return {
        ...state,
        token: action.payload,
        loading: false,
      };

    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
        loading: false,
      };
    case TOKEN_SIGN_DATA:
      return {
        ...state,
        sign: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
