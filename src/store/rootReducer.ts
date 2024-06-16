import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const rootReducer = combineReducers({
	auth: authReducer,
	// add reducers as needed
});

export default rootReducer;
