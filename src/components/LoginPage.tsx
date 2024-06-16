import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import axiosInstance from '../api/axiosInstance';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log('trying to login');

		try {
			const response = await axiosInstance.post('/users/login', { email, password });
			console.log('login successful');
			// console.log(response.data);
			dispatch(login({ id: response.data.user.id, username: response.data.user.username, email: response.data.user.email, admin: response.data.user.admin }));
			console.log('login state set successfully');
			console.log('redirecting to home page...');
			navigate('/home');
			console.log('redirected successfully');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='bg-gray-100'>
			<Navbar />
			<div className='flex flex-col items-center mt-24 p-24'>
				<Card className='mx-auto max-w-sm'>
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
