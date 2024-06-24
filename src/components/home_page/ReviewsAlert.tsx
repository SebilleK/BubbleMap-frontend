import { useDispatch, useSelector } from 'react-redux';
import { setAlertStoreReviews } from '@/store/reviewsSlice';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '../ui/card';

import { useEffect } from 'react';
import { getAllReviewsOfStore } from '@/api/utils/requests';
import { setStoreReviews } from '@/store/reviewsSlice';

import { CircleX } from 'lucide-react';

export default function ReviewsAlert() {
	const dispatch = useDispatch();
	const storeInfo = useSelector((state: any) => state.stores.storeInfo);

	//? store id to get reviews

	const storeId = storeInfo.storeId;

	//? get reviews :  useEffect + set them

	useEffect(() => {
		if (storeId) {
			getAllReviewsOfStore(storeId).then(data => {
				dispatch(setStoreReviews(data));
			});
		}
	}, [storeId]);

	//? use stored reviews

	const storeReviews = useSelector((state: any) => state.reviews.storeReviews);

	const closeInfo = () => {
		console.log('setting reviews alert to negative...');
		dispatch(setAlertStoreReviews(false));
	};
	return (
		<div className='fixed top-1/3 right-2 md:right-10 bg-white fixed z-50 p-2 rounded w-[90%] md:w-[400px]'>
			<button className='' onClick={closeInfo}>
				<CircleX />
			</button>
			<ScrollArea className='h-[250px] w-full border rounded p-4'>
				<div className='text-center mt-2 mb-6 text-xl'>
					<b>
						<h1>{storeInfo.storeName}</h1>
						<h2>Reviews</h2>
					</b>
				</div>

				{storeReviews.map((review: any) => {
					return (
						<Card className='my-2 p-2' key={review.id}>
							<h2>Rating: {review.rating}</h2>
							<p>{review.reviewText}</p>
						</Card>
					);
				})}
			</ScrollArea>
		</div>
	);
}
