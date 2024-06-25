import HomepageNavbar from '../HomepageNavbar';
import bubbleteaImage from '../../assets/bubbletea.jpg';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, setAlert, setAlertMessage } from '../../store/authSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginUser } from '@/api/utils/requests';
import AlertMessage from '../Alert';
export default function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const alertState = useSelector((state: any) => state.auth.alert);

	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log('trying to login: component');

		try {
			/* const response = await axiosInstance.post('/users/login', { email, password });
			console.log('login successful');
			console.log(response.data); */

			const response = await loginUser(email, password);
			//console.log(response)
			// console.log(response.response.data);

			if (response && response.response && response.response.data && response.response.data) {
				// if response is an error  (the following property would be present)
				console.log('error while logging in: ', response.response.data);
				console.log('hello');
				dispatch(setAlertMessage(response.response.data));
				dispatch(setAlert(true));
				return;
			} else {
				console.log(response);
				console.log('login successful: component');
				dispatch(login({ id: response.user.id, username: response.user.username, email: response.user.email, admin: response.user.admin }));
				console.log('login state set successfully');
				console.log('redirecting to home page...');
				navigate('/home');
				console.log('redirected successfully');
			}
		} catch (error: any) {
			console.log(alertState);
			// console.error(error);
			//?... if indeed an error, set alert to true
			dispatch(setAlert(true));
		}
	};

	return (
		<div className='bg-cover bg-center h-screen' style={{ backgroundImage: `url(${bubbleteaImage})` }}>
			{/* <Navbar /> */}
			<div className='flex flex-col items-center '>
				<HomepageNavbar />
			</div>

			{alertState && <AlertMessage />}
			<div className='flex flex-col items-center my-52'>
				<Card className='mx-auto max-w-sm mb-2.5'>
					<CardHeader>
						<CardTitle className='text-2xl'>Login</CardTitle>
						<CardDescription>Login below with your registered email and password</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleLogin}>
							<div className='grid gap-4'>
								<div className='grid gap-2'>
									<Label htmlFor='email'>Email</Label>
									<Input id='email' type='email' placeholder='m@example.com' value={email} onChange={e => setEmail(e.target.value)} required />
								</div>
								<div className='grid gap-2'>
									<div className='flex items-center'>
										<Label htmlFor='password'>Password</Label>
									</div>
									<Input id='password' type='password' placeholder='********' value={password} onChange={e => setPassword(e.target.value)} required />
								</div>
								<Button type='submit' className='w-full'>
									Login
								</Button>
							</div>
						</form>
						<div className='mt-4 text-center text-sm'>Don&apos;t have an account? </div>
						<div className='mt-4 text-center text-sm underline'>
							<Link to='/register'>Register</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
