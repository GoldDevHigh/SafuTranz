import {
	GET_PADS,
	GET_PAD,
	PAD_LOADING,
	GET_WHILTELIST,
	SET_WHILTELIST_STATE,
	GET_WHILTELIST_EVERY_DATA,
	SET_BUFFER_DATA1,
	SET_BUFFER_DATA
} from '../actions/types.js';

const initialState = {
	pads: [],
	whitelist: [],
	whitestate: {},
	whiteData: {},
	whiteData1: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case PAD_LOADING:
			return {
				...state,
				loading: true
			};

		case GET_PADS:
			return {
				...state,
				pads: action.payload,
				loading: false
			};

		case GET_PAD:
			return {
				...state,
				pad: action.payload,
				loading: false
			};
		case GET_WHILTELIST:
			return {
				...state,
				whitelist: action.payload,
				loading: false
			};
		case SET_WHILTELIST_STATE:
			return {
				...state,
				whitestate: action.payload,
				loading: false
			};
		case GET_WHILTELIST_EVERY_DATA:
			return {
				...state,
				whiteData: action.payload,
				loading: false
			};
		case SET_BUFFER_DATA:
			return {
				...state,
				whiteData: action.payload,
				loading: false
			};
		case SET_BUFFER_DATA1:
			return {
				...state,
				whiteData1: action.payload,
				loading: false
			};

		default:
			return state;
	}
}
