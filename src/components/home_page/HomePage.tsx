import MapComponent from './Map.tsx';
import MoreInfo from '../MoreInfo.tsx';
import { useEffect } from 'react';
import { getStores } from '@/api/utils/requests';
import { useDispatch } from 'react-redux';
import { setStores } from '@/store/storesSlice';
export default function Home() {
	const dispatch = useDispatch();

	useEffect(() => {
		getStores().then((response: any) => {
			dispatch(setStores(response));
		});
	}, []);

	return (
		<div className='flex flex-col items-center'>
			<MapComponent />
			<MoreInfo />
		</div>
	);
}
