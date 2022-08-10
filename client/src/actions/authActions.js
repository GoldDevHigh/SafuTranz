import {
	GET_ERRORS,
	GET_SUCCESS,
	SET_CURRENT_USER,
	LOGOUT_USER,
	GET_ESCROW_ADDRESS,
	GET_NETFEE_TOKEN,
	GET_NETFEE_LAUNCH,
	GET_RAISEDFEE
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode';

export const registerUser = (userData) => (dispatch) => {
	axios
		.post('/api/auth/register', userData)
		.then((res) => {
			dispatch({ type: GET_SUCCESS, payload: {} });
			alert('Password Change Successfully');
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};
export const userLogin = (userData) => (dispatch) => {
	axios
		.post('/api/auth/login', userData)
		.then((res) => {
			// Store Token into localstorage
			const { token } = res.data;
			localStorage.setItem('jwtToken', token);

			// Set Authorization
			setAuthToken(token);

			// Decode Token
			const decoded = jwtDecode(token);

			// Set Current User
			dispatch(setCurrentUser(decoded));
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

export const logoutUser = () => (dispatch) => {
	// remove token from local storage
	localStorage.removeItem('jwtToken');
	// Remove auth header for future request
	setAuthToken(false);
	// Set current user to {} which will set isAuthenticated to false
	dispatch({
		type: LOGOUT_USER,
		payload: {}
	});
};
export const setEscrowAddress = (escorwData) => (dispatch) => {
	axios.post('/api/auth/escrow', escorwData).then(alert('Escrow Address Set Successfully')).catch((err) =>
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

export const getEscrowAddress = () => (dispatch) => {
	axios
		.get('/api/auth/escrow')
		.then((data) => {
			dispatch({ type: GET_ESCROW_ADDRESS, payload: data });
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const setNetFeeValueToken = (data) => (dispatch) => {
	axios
		.post(`/api/auth/setNetFeeValueToken`, data)
		.then(alert('Token mint Fee value Set Successfully'))
		.catch((err) => console.log(err));
};

export const getNetFeeValueToken = () => (dispatch) => {
	axios
		.get(`/api/auth/getNetFeeValueToken/`)
		.then((data) =>
			dispatch({
				type: GET_NETFEE_TOKEN,
				payload: data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_NETFEE_TOKEN,
				payload: null
			})
		);
};

export const setNetFeeValueLaunch = (data) => (dispatch) => {
	axios
		.post(`/api/auth/setNetFeeValueLaunch/`, data)
		.then(alert('LaunchPad mint Fee value Set Successfully'))
		.catch((err) => console.log(err));
};

export const getNetFeeValueLaunch = () => (dispatch) => {
	axios
		.get(`/api/auth/getNetFeeValueLaunch/`)
		.then((data) =>
			dispatch({
				type: GET_NETFEE_LAUNCH,
				payload: data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_NETFEE_LAUNCH,
				payload: null
			})
		);
};

export const setRaisedFee = (data) => (dispatch) => {
	axios
		.post('api/auth/setRaisedFee/', data)
		.then(alert('Token raised fee value Set Successfully'))
		.catch((err) => console.log(err));
};

export const getRaisedFee = () => (dispatch) => {
	axios
		.get('/api/auth/getRaisedFee/')
		.then((data) =>
			dispatch({
				type: GET_RAISEDFEE,
				payload: data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_RAISEDFEE,
				payload: null
			})
		);
};
