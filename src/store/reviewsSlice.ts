import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReviewState {
	reviews: any;
	userReviews: any;
}

const initialState: ReviewState = {
	reviews: [],
	userReviews: [],
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
	},
});

export const { setReviews, setUserReviews, updateUserReviews } = reviewSlice.actions;

export default reviewSlice.reducer;
