import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useState } from 'react';

export default function Register() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const passwordChecker = (password: string, confirmPassword: string) => {
		if (password === confirmPassword) {
			return true;
		} else {
			return false;
		}
	};

	const handleRegister = async (event: React.FormEvent) => {
		event.preventDefault();

		console.log('comparing passwords...');

		if (!passwordChecker(password, confirmPassword)) {
			console.log('passwords do not match');
			alert('Password and confirm password do not match');

			return;
		}

		console.log('trying to register...');

		try {
			const response = await axiosInstance.post('/users/register', { username, email, password });
			console.log('registration successful: account created');
			console.log(response.data);
			console.log('redirecting to login page...');
			navigate('/login');
			console.log('redirected successfully');
		} catch (error: any) {
			console.error(error);
			console.log('registration failed: account not created');
			// message to use later
			console.log(error.response.data.message);
		}
	};

	return (
		<div className='bg-gray-100'>
			<Navbar />
			<div className='flex flex-col items-center mt-10 p-24'>
				<Card className='mx-auto max-w-sm'>
					<CardHeader>
						<CardTitle className='text-xl'>Sign Up</CardTitle>
						<CardDescription>Enter your information to create an account</CardDescription>
					</CardHeader>
					<form onSubmit={handleRegister}>
						<CardContent>
							<div className='grid gap-4'>
								<div className='grid gap-2'>
									<Label htmlFor='username'>Username</Label>
									<Input id='username' placeholder='edelgard3' value={username} onChange={e => setUsername(e.target.value)} required />
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='email'>Email</Label>
									<Input id='email' type='email' placeholder='e@example.com' value={email} onChange={e => setEmail(e.target.value)} required />
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='password'>Password</Label>
									<Input id='password' type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='********' required />
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='password-repeat'> Confirm Password</Label>
									<Input id='password-repeat' type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder='********' required />
								</div>
								<Button type='submit' className='w-full'>
									Create an account
								</Button>
							</div>
							<div className='mt-4 text-center text-sm'>
								Already have an account?
								<div className='mt-4 text-center text-sm underline'>
									<Link to='/login'>Login</Link>
								</div>
							</div>
						</CardContent>
					</form>
				</Card>
			</div>
		</div>
	);
}
