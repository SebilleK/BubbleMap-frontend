import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';

export default function Reviews() {
	const [reviewText, setReviewText] = useState('');
	const [rating, setRating] = useState('');
	const [reviews, setReviews] = useState([]);
	const [selectedReviewId, setSelectedReviewId] = useState(null);

	const user = JSON.parse(localStorage.getItem('user')!);

	const getAllReviews = async () => {
		try {
			const response = await axiosInstance.get(`/reviews/all/${user.id}`);
			console.log('reviews loaded successfully');
			setReviews(response.data);
			console.log('reviews set successfully');
		} catch (error) {
			console.error(error);
		}
	};

	const reloadReviews = () => {
		getAllReviews();
	};

	// get user reviews once
	useEffect(() => {
		getAllReviews();
	}, []);

	//! to set the correct id for editing
	const handleEditReview = (review: any) => {
		setSelectedReviewId(review.id);
	};

	//? update the review
	const handleReviewUpdate = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log('review is being updated...');
		// console.log(reviewText);
		// console.log(rating);
		// console.log(reviewId.value);

		if (rating === '' && reviewText === '') {
			console.log('no values provided: please enter a valid rating or review text');
			alert('Please enter a valid rating and review text');
			return;
		}

		//!!!! delete later
		/* if (parseInt(rating) < 1 || parseInt(rating) > 5) {
			alert('Please enter a valid rating between 1 and 5');
			return;
		} */

		// the backend expects a stringified object
		/* const updatedReview = {
			reviewText: reviewText,
			rating: rating,
		}; */

		/* const updatedReviewString = JSON.stringify(updatedReview); */

		try {
			const response = await axiosInstance.put(`/reviews/update/${selectedReviewId}`, {
				reviewText: reviewText === '' ? undefined : reviewText,
				rating: rating === '' ? undefined : parseInt(rating),
			});
			console.log('review updated successfully');
			console.log(response.data);
			reloadReviews(); // calls the getAllReviews function
			// window.location.reload();
		} catch (error) {
			console.log('there was an error while updating the review');
			console.error('error while updating review: ', error);
		}
	};

	return (
		<>
			<h1 className='m-4 text-2xl font-bold'>Reviews:</h1>

			{reviews.length === 0 ? (
				<p className='m-4'>No reviews yet</p>
			) : (
				<div className='flex items-start gap-2 m-4'>
					{reviews.map((review: any) => (
						<Card key={review.id} className='p-4'>
							<p>Rating: {review.rating}</p>
							<p> {review.reviewText}</p>
							<p>Store ID: {review.storeId}</p>
							<Popover>
								<PopoverTrigger>
									<Button onClick={() => handleEditReview(review)}>Edit Review</Button>
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
													<Input id='rating' type='number' value={rating} onChange={e => setRating(e.target.value)} className='col-span-2 h-8' />
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
						</Card>
					))}
				</div>
			)}
		</>
	);
}
