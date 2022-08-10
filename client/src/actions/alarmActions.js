import axios from 'axios';

import { GET_ALARM_DATA, SET_ALARM_DATA } from './types';

export const setAlaramData = (data) => (dispatch) => {
	axios.post(`/api/alarm/register`, data).then().catch((err) => console.log(err));
};

export const getAlaramData = (data) => (dispatch) => {
	axios
		.post(`/api/alarm/data/`, data)
		.then((data) => {
			dispatch({
				type: GET_ALARM_DATA,
				payload: data
			});
		})
		.catch((err) =>
			dispatch({
				type: GET_ALARM_DATA,
				payload: null
			})
		);
};
