// import { useSelector } from 'react-redux';
import Reviews from './ReviewsOnProfile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import MoreInfo from '../MoreInfo';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/authSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '@/api/utils/requests';

import { Edit } from 'lucide-react';
import { setAlert, setAlertMessage } from '@/store/authSlice';
import AlertMessage from '../Alert';

import HomepageNavbar from '../HomepageNavbar';

export default function Profile() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const alertState = useSelector((state: any) => state.auth.alert);

	const user = JSON.parse(localStorage.getItem('user')!); // useSelector((state: any) => state.auth.user);

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleUserUpdate = async (event: React.FormEvent) => {
		event.preventDefault();

		if (password === '' && email === '' && username === '') {
			dispatch(setAlertMessage('No changes were made. Please enter at least one field to update.'));
			dispatch(setAlert(true));
			//alert('No changes were made. Please enter at least one field to update.');
			return;
		}

		try {
			/* const response = await axiosInstance.put(`/users/${user.id}`, {
				username: username !== '' ? username : user.username,
				email: email !== '' ? email : user.email,
				password: password !== '' ? password : undefined,
			}); */

			/* const response = await updateUser(
				id: user.id,
				username: username !== '' ? username : user.username,
				email: email !== '' ? email : user.email,
				password: password !== '' ? password : undefined,
			); */

			const response = await updateUser(user.id, username !== '' ? username : user.username, email !== '' ? email : user.email, password !== '' ? password : undefined);

			// console.log(response);

			if (response && response.response && response.response.data && response.response.data.name) {
				dispatch(setAlertMessage('An existing user with the used email or username already exists.'));
				dispatch(setAlert(true));
				return;
			} else {
				console.log('user updated successfully');
				console.log(response.data);
				dispatch(logout());
				navigate('/login');
				console.log('user state updated successfully: logged out');
			}
		} catch (error) {
			console.error('error while updating user: ', error);
		}
	};

	return (
		<>
			<MoreInfo />
			<div className='flex flex-col items-center mb-28'>
				<HomepageNavbar />
			</div>

			{/* <Navbar /> */}

			<div className='flex flex-col items-center gap-2 m-4'>
				{alertState && <AlertMessage />}
				<h1 className='m-4 text-2xl font-bold'>Profile:</h1>
				<Card className='mx-auto w-96 p-10'>
					<Popover>
						<PopoverTrigger>
							<Edit />
						</PopoverTrigger>
						<PopoverContent>
							<form onSubmit={handleUserUpdate}>
								<div className='grid gap-4'>
									<div className='space-y-2'>
										<h4 className='font-medium leading-none'>Personal Info</h4>
										<p className='text-sm text-muted-foreground'>Edit your username, email, and/or password.</p>
									</div>
									<div className='grid gap-2'>
										<div className='grid grid-cols-3 items-center gap-4'>
											<Label htmlFor='width'>Username</Label>
											<Input id='username' type='text' value={username} onChange={e => setUsername(e.target.value)} className='col-span-2 h-8' />
										</div>
										<div className='grid grid-cols-3 items-center gap-4'>
											<Label htmlFor='maxWidth'>Email</Label>
											<Input id='email' type='email' value={email} onChange={e => setEmail(e.target.value)} className='col-span-2 h-8' />
										</div>
										<div className='grid grid-cols-3 items-center gap-4'>
											<Label htmlFor='height'>Password</Label>
											<Input id='password' type='password' value={password} onChange={e => setPassword(e.target.value)} className='col-span-2 h-8' />
										</div>
									</div>
									<Button type='submit'>Save changes</Button>
								</div>
							</form>
						</PopoverContent>
					</Popover>
					<CardHeader>
						<CardTitle>{user.username}</CardTitle>
						<CardDescription className='text-lg'>
							Hello, {user.username}! Welcome to your profile.
							<CardContent className='p-4 mt-4'>
								<p>ID: {user.id}</p>
								<p>Username: {user.username}</p>
								<p>Email: {user.email}</p>
								<p>Permissions: {user.admin ? 'Admin' : 'User'}</p>
							</CardContent>
						</CardDescription>
					</CardHeader>
				</Card>
			</div>

			<Reviews />
		</>
	);
}
