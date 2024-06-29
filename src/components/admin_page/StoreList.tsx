import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getStores } from '@/api/utils/requests';
import { setStores } from '@/store/storesSlice';
import StoreCards from './StoreCards';
export default function StoreList() {
	const dispatch = useDispatch();

	useEffect(() => {
		getStores().then((response: any) => {
			dispatch(setStores(response));
			console.log(response);
		});
	}, []);

	return (
		<div>
			<StoreCards />
		</div>
	);
}
