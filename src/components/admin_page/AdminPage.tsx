import HomepageNavbar from '../HomepageNavbar';
import { useState } from 'react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert, setAlertMessage } from '@/store/authSlice';
import AlertMessage from '../Alert';

import { createStore } from '../../api/utils/requests';

import StoreList from './StoreList';

export default function AdminPage() {
	const dispatch = useDispatch();
	const alertState = useSelector((state: any) => state.auth.alert);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [address, setAddress] = useState('');
	const [latitude, setLatitude] = useState<number | null>(null);
	const [longitude, setLongitude] = useState<number | null>(null);

	const handleStoreCreate = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log('trying to create store: component');

		if (name === '' || latitude === 0 || longitude === 0) {
			dispatch(setAlertMessage('Please enter all fields marked with *'));
			dispatch(setAlert(true));
		}

		const storeData = {
			name,
			description,
			address,
			latitude,
			longitude,
		};

		try {
			const response = await createStore(storeData);
			console.log('response: ', response);

			if (response && response.response && response.response.data && response.response.data.type) {
				dispatch(setAlertMessage('Please enter all fields in the correct format. For coordinates, use decimal notation like: "40.71281, -74.00603" with 5 decimal places.'));
				dispatch(setAlert(true));
				return;
			}
		} catch (error) {
			console.error('Error while creating store: ', error);
			dispatch(setAlertMessage('Error while creating store: ' + error));
			dispatch(setAlert(true));
		}
	};
	return (
		<div className='flex flex-col items-center gap-32'>
			<div className='flex flex-col items-center'>
				<HomepageNavbar />
			</div>

			{alertState && <AlertMessage />}

			<Card className='w-1/2 p-10'>
				<form onSubmit={handleStoreCreate}>
					<div className='grid gap-4'>
						<div className='space-y-2'>
							<h4 className='font-medium leading-none'>Create a new store</h4>
							<p className='text-sm text-muted-foreground'>Please provide all camps marked with *</p>
							<p className='text-sm text-muted-foreground'>A new store will be created and added to the database. Double check all fields!</p>
						</div>
						<div className='grid gap-2'>
							<div className='grid grid-cols-3 items-center gap-4'>
								<Label htmlFor='width'>Name *</Label>
								<Input id='username' type='text' value={name} onChange={e => setName(e.target.value)} className='col-span-2 h-8' />
							</div>
							<div className='grid grid-cols-3 items-center gap-4'>
								<Label htmlFor='maxWidth'>Description</Label>
								<Input id='email' type='text' value={description} onChange={e => setDescription(e.target.value)} className='col-span-2 h-8' />
							</div>
							<div className='grid grid-cols-3 items-center gap-4'>
								<Label htmlFor='maxWidth'>Address</Label>
								<Input id='email' type='text' value={address} onChange={e => setAddress(e.target.value)} className='col-span-2 h-8' />
							</div>
							<div className='grid grid-cols-3 items-center gap-4'>
								<Label htmlFor='maxWidth'>Latitude *</Label>
								<Input id='email' type='number' step={0.00001} min={-90} max={90} onChange={e => setLatitude(Number(e.target.value))} className='col-span-2 h-8' />
							</div>
							<div className='grid grid-cols-3 items-center gap-4'>
								<Label htmlFor='height'>Longitude *</Label>
								<Input id='password' type='number' step={0.00001} min={-180} max={180} onChange={e => setLongitude(Number(e.target.value))} className='col-span-2 h-8' />
							</div>
						</div>
						<Button type='submit'>Create</Button>
					</div>
				</form>
			</Card>

			<StoreList />
		</div>
	);
}
