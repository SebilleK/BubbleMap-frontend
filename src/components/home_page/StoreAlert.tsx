import { setAlert } from '@/store/storesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setStoreInfo } from '@/store/storesSlice';

import { Card, CardContent, CardFooter, CardTitle } from '../ui/card';
import { CircleX } from 'lucide-react';
import { Button } from '../ui/button';
import { setAlertStoreReviews } from '@/store/reviewsSlice';
import ReviewsAlert from './ReviewsAlert';

export default function StoreAlert() {
	const dispatch = useDispatch();
	const storeInfo = useSelector((state: any) => state.stores.storeInfo);
	const reviewInfo = useSelector((state: any) => state.reviews.storeReviewsAlert);

	const closeInfo = () => {
		dispatch(setAlert(false));
		dispatch(setStoreInfo({}));
	};

	const reviewsInfo = () => {
		console.log('setting reviews alert to positive/negative...');

		if (reviewInfo) {
			dispatch(setAlertStoreReviews(false));
		} else {
			dispatch(setAlertStoreReviews(true));
		}
	};

	return (
		<>
			<div className='fixed top-1/2 left-1/4 transform -translate-x-1/4 w-[90%] max-w-sm md:w-1/3 md:max-w-md lg:max-w-lg bg-white p-3 rounded shadow border'>
				<button className='p-2' onClick={closeInfo}>
					<CircleX />
				</button>
				<Card>
					<div className='text-center mt-4 mb-6'>
						<CardTitle>{storeInfo.storeName}</CardTitle>
					</div>

					<CardContent>
						<p>{storeInfo.storeDescription}</p>
					</CardContent>

					<CardFooter>
						<p>{storeInfo.storeAddress}</p>
					</CardFooter>
					<div className='text-center mb-4'>
						<Button onClick={reviewsInfo}>{reviewInfo ? 'Hide Reviews' : 'Show Reviews'}</Button>
					</div>
				</Card>
			</div>
			{reviewInfo && <ReviewsAlert />}
		</>
	);
}
