import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Edit } from 'lucide-react';

import { useDispatch, useSelector } from 'react-redux';

import { setUserReviews, updateUserReviews } from '@/store/reviewsSlice';

import { getAllReviewsOfUser, updateReview } from '@/api/utils/requests';
import { setAlert, setAlertMessage } from '@/store/authSlice';
import AlertMessage from '../Alert';

export default function Reviews() {
	//? redux store - actions and state of user reviews
	const dispatch = useDispatch();
	const reviews = useSelector((state: any) => state.reviews.userReviews);

	//? alert state boolean
	const alertVisible = useSelector((state: any) => state.auth.alert);

	//? editing inputs
	const [reviewText, setReviewText] = useState('');
	const [rating, setRating] = useState('');
	const [selectedReviewId, setSelectedReviewId] = useState(null);

	//? current user
	const user = JSON.parse(localStorage.getItem('user')!);

	//? Component mount:
	//? 1. get all reviews by the user(GET)
	//? 2. set them in the state as userReviews
	useEffect(() => {
		getAllReviewsOfUser(user.id).then(data => {
			dispatch(setUserReviews(data));
		});
		console.log('all reviews by user fetched');
	}, []);

	//? to set the correct id for editing + inputs initial values
	const handleEditReview = (review: any) => {
		setSelectedReviewId(review.id);
		setReviewText(review.reviewText);
		setRating(review.rating);
	};

	//! update the review: database + frontend state
	const handleReviewUpdate = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log('review is being updated...');
		// console.log(reviewText);
		// console.log(rating);
		// console.log(reviewId.value);

		//? checks for empty values
		if (rating === '' && reviewText === '') {
			console.log('no values provided: please enter a valid rating or review text');
			alert('Please enter a valid rating and review text');
			return;
		}

		//? checks for invalid values
		if (parseInt(rating) < 1 || parseInt(rating) > 5) {
			console.log('invalid rating value: please enter a valid rating between 1 and 5');
			dispatch(setAlertMessage('Please enter a valid rating between 1 and 5'));
			dispatch(setAlert(true));
			// alert('Please enter a valid rating between 1 and 5');
			return;
		}
		if (reviewText.length < 10 || reviewText.length > 1000) {
			console.log('invalid review text: please enter a review text with more than 10 characters and less than 1000 characters');

			dispatch(setAlertMessage('Please enter a review text with more than 10 characters and less than 500 characters'));
			dispatch(setAlert(true));
			return;
		}

		//! update the reviews in db + state
		try {
			/* const response = await axiosInstance.put(`/reviews/update/${selectedReviewId}`, {
				reviewText: reviewText === '' ? undefined : reviewText,
				rating: rating === '' ? undefined : parseInt(rating),
			}); */
			//! updated below

			//? PUT request to update review in db
			const response = await updateReview(selectedReviewId!, {
				reviewText: reviewText === '' ? undefined : reviewText,
				rating: rating === '' ? undefined : parseInt(rating),
			});
			console.log('review updated successfully in db');
			console.log(response);

			//? dispatch update action for the review in the state
			const updatedReview = response;
			dispatch(updateUserReviews(updatedReview));
			console.log('review updated successfully in state');
			alert('Review updated successfully!');
		} catch (error) {
			console.log('there was an error while updating the review');
			console.error('error while updating review: ', error);
		}

		/* //! update the reviews in state (GET request, dispatch action)
		getAllReviewsOfUser(user.id).then(data => {
			dispatch(setUserReviews(data));
			console.log('review updated successfully in state');
		}); */
		//! It is unnecessary to do another fetch here. see above!!!!
	};

	return (
		<>
			<h1 className='m-4 text-2xl font-bold'>Reviews:</h1>

			{reviews.length === 0 ? (
				<p className='m-4'>No reviews yet</p>
			) : (
				<div className='flex items-start gap-2 m-4'>
					{alertVisible && <AlertMessage />}
					{reviews.map((review: any) => (
						<Card key={review.id} className='p-4'>
							<Popover>
								<PopoverTrigger>
									<Button onClick={() => handleEditReview(review)}>
										<Edit />
									</Button>
								</PopoverTrigger>
								<PopoverContent>
									<form onSubmit={handleReviewUpdate}>
										<div className='grid gap-4'>
											<div className='space-y-2'>
												<h4 className='font-medium leading-none'>Review Info</h4>
												<p className='text-sm text-muted-foreground'>Edit your review of a store.</p>
											</div>
											<div className='grid gap-2'>
												<div className='grid grid-cols-3 items-center gap-4'>
													<Label htmlFor='rating'>Rating</Label>
													<Input id='rating' type='number' min={1} max={5} value={rating} onChange={e => setRating(e.target.value)} className='col-span-2 h-8' />
												</div>
												<div className='grid grid-cols-3 items-center gap-4'>
													<Label htmlFor='reviewText'>Text</Label>
													<Input id='reviewText' type='text' value={reviewText} onChange={e => setReviewText(e.target.value)} className='col-span-2 h-8' />
												</div>
											</div>
											<Button type='submit'>Save changes</Button>
										</div>
									</form>
								</PopoverContent>
							</Popover>
							<div className='p-4'>
								<p>
									<b>Store ID:</b> {review.storeId}
								</p>
								<p>
									<b>Rating:</b> {review.rating}
								</p>
								<p className='mt-2'> {review.reviewText}</p>
							</div>
						</Card>
					))}
				</div>
			)}
		</>
	);
}
