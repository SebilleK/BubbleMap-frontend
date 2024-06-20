import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import reviewReducer from './reviewsSlice';
import storeReducer from './storesSlice';

const rootReducer = combineReducers({
	auth: authReducer,
	reviews: reviewReducer,
	stores: storeReducer,
	// add reducers as needed
});

export default rootReducer;
