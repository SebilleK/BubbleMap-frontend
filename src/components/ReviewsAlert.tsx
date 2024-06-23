import { useDispatch, useSelector } from 'react-redux';
import { setAlertStoreReviews } from '@/store/reviewsSlice';

export default function ReviewsAlert() {
	const dispatch = useDispatch();
	const storeInfo = useSelector((state: any) => state.stores.storeInfo);

	const closeInfo = () => {
		console.log('setting reviews alert to negative...');
		dispatch(setAlertStoreReviews(false));
	};
	return (
		<div className='bottom-0 left-1/2 bg-white fixed z-50'>
			<h1>STORE ID: {storeInfo.storeId}</h1>
			<ul>
				<li>Store Reviews here:</li>
				<li>1. should be a scroll element</li>
				<li>2. should make the api call to get reviews of a store</li>
				<li>3. define api call on api/utils and use UseEffect</li>
			</ul>

			<button onClick={closeInfo}>close this click here</button>
		</div>
	);
}
