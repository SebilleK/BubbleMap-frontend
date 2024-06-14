import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import authReducer from './authSlice';

const rootReducer = combineReducers({
	counter: counterReducer,
	auth: authReducer,
	// add reducers as needed
});

export default rootReducer;
