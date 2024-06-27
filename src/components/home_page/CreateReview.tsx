import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '../ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { setAlertCreateReview } from '@/store/reviewsSlice';
import { Textarea } from '@/components/ui/textarea';
import { CircleX } from 'lucide-react';
import { useState } from 'react';
import { setAlert, setAlertMessage } from '@/store/authSlice';
import { createReview } from '@/api/utils/requests';
import AlertMessage from '../Alert';

export default function CreateReview() {
	const dispatch = useDispatch();
	const storeInfo = useSelector((state: any) => state.stores.storeInfo);
	const user = JSON.parse(localStorage.getItem('user')!); //const user = useSelector((state: any) => state.auth.user);
	const alertPopup = useSelector((state: any) => state.auth.alert);

	const [reviewText, setReviewText] = useState('');
	const [rating, setRating] = useState(5);

	const closeInfo = () => {
		dispatch(setAlertCreateReview(false));
	};

	const handleReviewCreation = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log('review creation logic here...');

		try {
			const reviewData = {
				rating: rating,
				reviewText: reviewText,
			};

			console.log('review data: ');
			console.log(reviewData);
			console.log('store id, user id: ');
			console.log(storeInfo.storeId, user.id);

			const response = await createReview({ storeId: storeInfo.storeId, id: user.id }, reviewData);

			console.log(response);

			dispatch(setAlertCreateReview(false));

			if (response && response.response && response.response.data && response.response.data.name) {
				if (response.response.data.message.toLowerCase().includes('validation')) {
					dispatch(setAlertMessage('Please enter a review text with more than 10 characters and less than 500 characters. Your rating must be between 1 and 5.'));
					dispatch(setAlert(true));
					return;
				} else {
					dispatch(setAlertMessage(response.response.data.message));
					dispatch(setAlert(true));
				}
			}
		} catch (error) {
			setAlertMessage('Failed to create review. Please try again later.');
			dispatch(setAlert(true));
			console.log(error);
		}
	};

	return (
		<div className='fixed top-1/3 right-2 md:right-10 bg-white fixed z-50 p-2 rounded w-[90%] md:w-[500px] md:h-[530px] dark:bg-black'>
			<button className='p-2' onClick={closeInfo}>
				<CircleX />
			</button>

			{alertPopup && <AlertMessage />}
			<div className='w-full border rounded p-4 '>
				<h1 className='text-center mt-2 mb-6 text-xl'>
					<b>Create a Review for {storeInfo.storeName} </b>
				</h1>
				<form className='flex flex-col justify-center gap-2' onSubmit={handleReviewCreation}>
					<Label htmlFor='rating'>
						<b>Rating:</b>
					</Label>
					<Input onChange={e => setRating(Number(e.target.value))} type='number' min={1} max={5} id='rating' />
					<Label htmlFor='reviewText'>
						<b>Review:</b>
					</Label>
					<Textarea onChange={e => setReviewText(e.target.value)} id='reviewText' className='h-[200px] max-h-[200px]'></Textarea>
					<Button type='submit'>Submit</Button>
				</form>
			</div>
		</div>
	);
}
