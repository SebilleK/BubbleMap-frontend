import { setAlert } from '@/store/storesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setStoreInfo } from '@/store/storesSlice';

import { Card, CardContent, CardFooter, CardTitle } from './ui/card';
import { CircleX } from 'lucide-react';

export default function StoreAlert() {
	const dispatch = useDispatch();
	const storeInfo = useSelector((state: any) => state.stores.storeInfo);

	const closeInfo = () => {
		dispatch(setAlert(false));
		dispatch(setStoreInfo({}));
	};

	return (
		<div className='fixed bottom-10 left-1/4 transform -translate-x-1/2 w-full max-w-sm md:w-1/3 md:max-w-md lg:max-w-lg bg-white p-3 rounded shadow border'>
			<Card>
				<button className='p-2' onClick={closeInfo}>
					<CircleX />
				</button>
				<div className='text-center mb-6'>
					<CardTitle>{storeInfo.storeName}</CardTitle>
				</div>

				<CardContent>
					<p>{storeInfo.storeDescription}</p>
				</CardContent>

				<CardFooter>
					<p>{storeInfo.storeAddress}</p>
				</CardFooter>
			</Card>
		</div>
	);
}
