import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect } from 'react';
import { getStores } from '@/api/utils/requests';
import { useDispatch, useSelector } from 'react-redux';
import { setStores } from '@/store/storesSlice';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
export default function Home() {
	const dispatch = useDispatch();

	const stores = useSelector((state: any) => state.stores.stores);

	useEffect(() => {
		getStores().then((response: any) => {
			dispatch(setStores(response));
		});
	}, []);

	return (
		<div>
			<Navbar />
			<div className='flex flex-col items-center mt-2 p-5'>
				<h1>Stores List</h1>

				<div className='flex flex-col '>
					{stores.map((store: any) => (
						<Card key={store.id} className='w-88 mt-4 p-4'>
							<CardHeader>
								<CardTitle>{store.name}</CardTitle>
							</CardHeader>
							<CardContent>
								<p>{store.description}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* 	<Footer /> */}
		</div>
	);
}
