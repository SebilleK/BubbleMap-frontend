import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import reviewReducer from './reviewsSlice';

const rootReducer = combineReducers({
	auth: authReducer,
	reviews: reviewReducer,
	// add reducers as needed
});

export default rootReducer;
