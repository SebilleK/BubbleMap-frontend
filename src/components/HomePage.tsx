import Navbar from './Navbar';
import Footer from './Footer';
import axiosInstance from '../api/axiosInstance';
import { useEffect, useState } from 'react';
import bubbleteaImage from '../assets/bubbletea.jpg';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
export default function Home() {
	const [stores, setStores] = useState([]);

	useEffect(() => {
		axiosInstance
			.get('/stores')
			.then(response => {
				setStores(response.data);
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	return (
		<div className='bg-cover bg-center h-screen' style={{ backgroundImage: `url(${bubbleteaImage})` }}>
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

			<Footer />
		</div>
	);
}
