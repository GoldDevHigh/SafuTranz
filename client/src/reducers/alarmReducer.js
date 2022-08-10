import { GET_ALARM_DATA } from '../actions/types';

const initialState = {
	alarmData: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ALARM_DATA:
			return {
				...state,
				alarmData: action.payload
			};
		default:
			return state;
	}
}
