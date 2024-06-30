import { Card, CardContent } from '../ui/card';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2, Edit } from 'lucide-react';
import { deleteStore, updateStore } from '@/api/utils/requests';
import { setStores } from '@/store/storesSlice';

import { useState } from 'react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function StoreCards() {
	const dispatch = useDispatch();
	const stores = useSelector((state: any) => state.stores.stores);

	//? editing inputs
	const [storeName, setStoreName] = useState('');
	const [storeDescription, setStoreDescription] = useState('');
	const [address, setAddress] = useState('');
	const [storeId, setStoreId] = useState(null);

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

	const handleEditStore = (store: any) => {
		setStoreName(store.name);
		setStoreDescription(store.description);
		setAddress(store.address);
		setStoreId(store.id);
	};

	const handleStoreUpdate = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log('store is being updated...');
		// console.log(storeName);
		// console.log(storeDescription);
		// console.log(storeId.value);

		//? checks for empty values
		if (storeName === '' && storeDescription === '' && address === '') {
			alert('no values provided: please enter a valid store name, description or address');
			return;
		}

		//? update store in state and db
		try {
			const updatedStoreInfo = {
				name: storeName,
				description: storeDescription,
				address: address,
			};

			const response = await updateStore(storeId!, updatedStoreInfo);

			if (response && response.name === 'AxiosError') {
				console.log(response);
				alert('Error: ' + response.response.data.message);
				return;
			}

			console.log(response);

			//? update store in state
			const updatedStore = response;
			const updatedStores = stores.map((store: any) => {
				if (store.id === updatedStore.id) {
					return updatedStore;
				}
				return store;
			});
			dispatch(setStores(updatedStores));
			console.log('store updated successfully in state');
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
					<Popover>
						<PopoverTrigger>
							<Edit onClick={() => handleEditStore(store)} />
						</PopoverTrigger>

						<PopoverContent>
							<form onSubmit={handleStoreUpdate}>
								<div className='grid gap-4'>
									<div className='space-y-2'>
										<h4 className='font-medium leading-none'>Store Info</h4>
										<p className='text-sm text-muted-foreground'>Edit a store</p>
									</div>
									<div className='grid gap-2'>
										<div className='grid grid-cols-3 items-center gap-4'>
											<Label htmlFor='name'>Name</Label>
											<Input id='name' type='text' value={storeName} onChange={e => setStoreName(e.target.value)} className='col-span-2 h-8' />
										</div>
										<div className='grid grid-cols-3 items-center gap-4'>
											<Label htmlFor='description'>Description</Label>
											<Input id='description' type='text' value={storeDescription} onChange={e => setStoreDescription(e.target.value)} className='col-span-2 h-8' />
										</div>
										<div className='grid grid-cols-3 items-center gap-4'>
											<Label htmlFor='address'>Address</Label>
											<Input id='address' type='text' value={address} onChange={e => setAddress(e.target.value)} className='col-span-2 h-8' />
										</div>
									</div>
									<Button type='submit'>Save changes</Button>
								</div>
							</form>
						</PopoverContent>
					</Popover>
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
