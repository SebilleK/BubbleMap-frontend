import axiosInstance from '../axiosInstance';

//? USERS

//? Login
export async function loginUser(email: string, password: string) {
	console.log('logging in...');
	try {
		const response = await axiosInstance.post('/users/login', { email, password });
		console.log('login successful, returning response...');
		return response.data;
	} catch (error) {
		console.log('there was an error while logging in, returning error...');
		console.error(error);
	}
}

//? Register
export async function registerUser(username: string, email: string, password: string) {
	console.log('registering...');
	try {
		const response = await axiosInstance.post('/users/register', { username, email, password });
		console.log('registration successful, returning response...');
		return response.data;
	} catch (error) {
		console.log('there was an error while registering, returning error...');
		console.error(error);
	}
}

//? STORES
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

//? Get all reviews of a store
export async function getAllReviewsOfStore(id: string) {
	console.log('fetching all reviews of given store...');
	try {
		const response = await axiosInstance.get(`/reviews/all/store/${id}`);
		console.log('reviews by store fetched successfully, returning response...');
		return response.data;
	} catch (error) {
		console.log('there was an error while fetching the store reviews, returning error...');
		console.error(error);
	}
}

//? Get all reviews of a user
export async function getAllReviewsOfUser(id: string) {
	console.log('fetching all reviews of given user...');
	try {
		const response = await axiosInstance.get(`/reviews/all/user/${id}`);
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
