import { useSelector } from 'react-redux';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import Navbar from './Navbar';

export default function Profile() {
	const user = useSelector((state: any) => state.auth.user);

	return (
		<div className='bg-gray-100'>
			<Navbar />
			<div className='flex flex-col items-center'>
				<h1>Profile Page</h1>
				<Card>
					<CardHeader>
						<CardTitle>{user.username}</CardTitle>
						<CardDescription>
							Hello, {user.username}! Welcome to your profile.
							<CardContent>
								<ul>
									<li>ID: {user.id}</li>
									<li>Username: {user.username}</li>
									<li>Email: {user.email}</li>
									<li>Permissions: {user.admin ? 'Admin' : 'User'}</li>
								</ul>
							</CardContent>
						</CardDescription>
					</CardHeader>
				</Card>
			</div>
		</div>
	);
}
