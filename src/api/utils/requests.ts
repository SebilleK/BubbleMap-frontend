import axiosInstance from '../axiosInstance';
export async function getStores() {
	console.log('fetching stores...');
	try {
		const response = await axiosInstance.get('/stores');
		console.log('stores fetched successfully, returning response...');
		return response.data;
	} catch (error) {
		console.log('there was an error while fetching stores, returning error...');
		console.error(error);
	}
}

//?REVIEWS

//? Get all reviews
export async function getReviews() {
	console.log('fetching all reviews...');
	try {
		const response = await axiosInstance.get('/reviews');
		console.log('reviews fetched successfully, returning response...');
		return response.data;
	} catch (error) {
		console.log('there was an error while fetching reviews, returning error...');
		console.error(error);
	}
}

//? Get all reviews of a user
export async function getAllReviewsOfUser(id: string) {
	console.log('fetching all reviews of given user...');
	try {
		const response = await axiosInstance.get(`/reviews/all/${id}`);
		console.log('reviews by user fetched successfully, returning response...');
		return response.data;
	} catch (error) {
		console.log('there was an error while fetching the user reviews, returning error...');
		console.error(error);
	}
}

//? Update a review
export async function updateReview(id: string, options: { rating?: number; reviewText?: string }) {
	console.log('updating review...');
	const { rating, reviewText } = options;
	try {
		const response = await axiosInstance.put(`/reviews/update/${id}`, {
			rating,
			reviewText,
		});
		console.log('review updated successfully, returning response...');
		return response.data;
	} catch (error) {
		console.log('there was an error while updating review, returning error...');
		console.error(error);
	}
}
