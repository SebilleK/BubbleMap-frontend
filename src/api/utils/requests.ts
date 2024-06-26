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
		return error;
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
		return error;
	}
}

//? update a user

export async function updateUser(id: string, username: string, email: string, password: string | undefined) {
	console.log('updating user...');
	try {
		const response = await axiosInstance.put(`/users/${id}`, {
			username: username,
			email: email,
			password: password,
		});

		return response as any;
	} catch (error) {
		console.log('there was an error while updating user, returning error...');
		console.error(error);
		return error;
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

export async function createStore(body: any) {
	console.log('creating store...');
	try {
		const response = await axiosInstance.post('/stores/create', body);

		return response.data;
	} catch (error) {
		console.log('there was an error while creating store, returning error...');
		console.error(error);
		return error;
	}
}

export async function deleteStore(id: string) {
	console.log('deleting store...');
	try {
		const response = await axiosInstance.delete(`/stores/${id}`);
		console.log('store deleted successfully in the db, returning response...');
		return response.data;
	} catch (error) {
		console.log('there was an error while deleting store, returning error...');
		console.error(error);
		return error;
	}
}

export async function updateStore(id: string, body: any) {
	console.log('updating store...');
	try {
		const response = await axiosInstance.put(`/stores/${id}`, body);
		console.log('store updated successfully in the db, returning response...');
		return response.data;
	} catch (error) {
		console.log('there was an error while updating store, returning error...');
		console.error(error);
		return error;
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

//? Create a review
export async function createReview(params: { storeId: string; id: string }, body: { rating: number; reviewText: string }) {
	console.log('creating review...');
	const { storeId, id } = params;
	const { rating, reviewText } = body;
	try {
		const response = await axiosInstance.post(`/reviews/create/${id}/${storeId}`, {
			rating,
			reviewText,
		});
		console.log('review created successfully, returning response...');
		return response.data;
	} catch (error) {
		console.log('there was an error while creating review, returning error...');
		console.error(error);
		return error;
	}
}

//? Delete a review
export async function deleteReview(id: string) {
	console.log('deleting review...');
	try {
		const response = await axiosInstance.delete(`/reviews/delete/${id}`);
		console.log('review deleted successfully in db, returning response...');
		return response.data;
	} catch (error) {
		console.log('there was an error while deleting review, returning error...');
		console.error(error);
		return error;
	}
}
