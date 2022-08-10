import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import verifyReducer from './verifyReducer';
import padReducer from './padReducer';
import tokenReducer from './tokenReducer';
import authReducer from './authReducer';
import alarmReducer from './alarmReducer';

export default combineReducers({
	verify: verifyReducer,
	errors: errorReducer,
	pad: padReducer,
	token: tokenReducer,
	auth: authReducer,
	alarm: alarmReducer
});
