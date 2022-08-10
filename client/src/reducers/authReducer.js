import { SET_CURRENT_USER, GET_SUCCESS, LOGOUT_USER, SET_ESCROW_ADDRESS, GET_ESCROW_ADDRESS,	SET_NETFEE_TOKEN,
	GET_NETFEE_TOKEN,
	SET_NETFEE_LAUNCH,
	GET_NETFEE_LAUNCH,GET_RAISEDFEE } from '../actions/types';
import isEmpty from '../utils/isEmpty';

const initialState = {
	auth: {
		isAuthenticated: false,
		user: {},
		escrowAddress: {},
		netFeeToken:{},
		netFeeLaunch:{},
		raisedFee:17
	}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_SUCCESS:
			return {
				...state,
				user: action.payload
			};
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			};
		case LOGOUT_USER: {
			return {
				...state,
				isAuthenticated: false,
				user: action.payload
			};
		}
		case SET_ESCROW_ADDRESS: {
			return {
				...state,
				escrowAddress: action.payload
			};
		}
		case GET_ESCROW_ADDRESS: {
			return {
				...state,
				escrowAddress: action.payload
			};
		}
		case SET_NETFEE_TOKEN:
			return {
				...state,
				netFeeToken: action.payload,
				loading: false
			};
		case SET_NETFEE_LAUNCH:
			return {
				...state,
				netFeeLaunch: action.payload,
				loading: false
			};
		case GET_NETFEE_TOKEN:
			return {
				...state,
				netFeeToken: action.payload,
				loading: false
			};
		case GET_NETFEE_LAUNCH:
			return {
				...state,
				netFeeLaunch: action.payload,
				loading: false
			};
		case GET_RAISEDFEE:
			return {
				...state,
				raisedFee: action.payload,
				loading: false
			};
		
		default:
			return state;
	}
}
