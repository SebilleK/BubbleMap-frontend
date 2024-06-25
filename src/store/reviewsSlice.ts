import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReviewState {
	reviews: any;
	userReviews: any;
	storeReviews: any;
	storeReviewsAlert: boolean;
	alertCreateReview: boolean;
}

const initialState: ReviewState = {
	reviews: [],
	userReviews: [],
	storeReviews: [],
	storeReviewsAlert: false,
	alertCreateReview: false,
};

const reviewSlice = createSlice({
	name: 'reviews',
	initialState,
	reducers: {
		setReviews: (state, action: PayloadAction<any>) => {
			state.reviews = action.payload;
		},
		setUserReviews: (state, action: PayloadAction<any>) => {
			state.userReviews = action.payload;
		},
		updateUserReviews: (state, action: PayloadAction<any>) => {
			const index = state.userReviews.findIndex((review: any) => review.id === action.payload.id);

			if (index !== -1) {
				state.userReviews[index] = action.payload;
			}
		},
		setAlertStoreReviews: (state, action: PayloadAction<any>) => {
			state.storeReviewsAlert = action.payload;
		},
		setStoreReviews: (state, action: PayloadAction<any>) => {
			state.storeReviews = action.payload;
		},
		setAlertCreateReview: (state, action: PayloadAction<any>) => {
			state.alertCreateReview = action.payload;
		},
	},
});

export const { setReviews, setUserReviews, updateUserReviews, setStoreReviews, setAlertStoreReviews, setAlertCreateReview } = reviewSlice.actions;

export default reviewSlice.reducer;
