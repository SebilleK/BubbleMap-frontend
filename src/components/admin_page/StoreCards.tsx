import { Card, CardContent } from '../ui/card';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2 } from 'lucide-react';
import { deleteStore } from '@/api/utils/requests';
import { setStores } from '@/store/storesSlice';

export default function StoreCards() {
	const dispatch = useDispatch();
	const stores = useSelector((state: any) => state.stores.stores);

	const handleDeleteStore = async (store: any) => {
		console.log(store);

		try {
			const response = await deleteStore(store.id);

            if (response && response.name === 'AxiosError') {
                console.log(response);
				alert('Error: ' + response.response.data.message);
				return;
			}

            console.log(response);
			const updatedStores = stores.filter((s: any) => s.id !== store.id);
            dispatch(setStores(updatedStores));
            
			console.log('store state updated in store slice');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='flex flex-col items-center'>
			<h1 className='font-bold text-2xl mb-6'>Store Management</h1>
			{stores.map((store: any) => (
				<Card className='mb-4 p-10 w-1/2' key={store.id}>
					<button onClick={() => handleDeleteStore(store)}>
						<Trash2 />
					</button>
					<CardContent>
						<div className='flex flex-col items-center space-y-4'>
							<h2 className='font-bold'>{store.name}</h2>
							<p>{store.description}</p>
							<p>{store.address}</p>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
