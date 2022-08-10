import { GET_PADS, GET_PAD, PAD_LOADING } from "../actions/types.js";

const initialState = {
  pads: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PAD_LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_PADS:
      return {
        ...state,
        pads: action.payload,
        loading: false,
      };

    case GET_PAD:
      return {
        ...state,
        pad: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
