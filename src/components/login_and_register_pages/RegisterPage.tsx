import HomepageNavbar from '../HomepageNavbar';
import bubbleteaImage from '../../assets/bubbletea.jpg';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { registerUser } from '@/api/utils/requests';
import { setAlertMessage, setAlert } from '@/store/authSlice';
import AlertMessage from '../Alert';

export default function Register() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const alertState = useSelector((state: any) => state.auth.alert);
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
			dispatch(setAlertMessage('Passwords do not match'));
			dispatch(setAlert(true));

			return;
		}

		console.log('trying to register...');

		try {
			const response = await registerUser(username, email, password);
			// console.log('registration underway...');

			if (response && response.response && response.response.data && response.response.data.type) {
				dispatch(setAlertMessage(response.response.data.on));
				dispatch(setAlert(true));
				return;
			}

			if (response && response.response && response.response.data && response.response.data.name) {
				// if response is an error  (the following property would be present)
				dispatch(setAlertMessage(response.response.data.message));
				dispatch(setAlert(true));
				return;
			} else {
				console.log(response);
				console.log('redirecting to login page...');
				navigate('/login');
				console.log('redirected successfully');
			}
		} catch (error: any) {
			console.error(error);
			console.log('registration failed: account not created');
			dispatch(setAlertMessage('There was an error while creating your account. Please try again.'));
			dispatch(setAlert(true));
		}
	};

	return (
		<div className='bg-cover bg-center h-screen'>
			{/* <Navbar /> */}
			<div className='flex flex-col items-center '>
				<HomepageNavbar />
			</div>
			{alertState && <AlertMessage />}
			<div className='flex flex-col items-center p-24 my-24'>
				<Card className='mx-auto max-w-sm mb-2.5'>
					<CardHeader>
						<CardTitle className='text-xl'>Register</CardTitle>
						<CardDescription>Enter your information to create an account</CardDescription>
					</CardHeader>
					<form onSubmit={handleRegister}>
						<CardContent>
							<div className='grid gap-4'>
								<div className='grid gap-2'>
									<Label htmlFor='username'>Username</Label>
									<Input id='username' placeholder='edelgard3' value={username} onChange={e => setUsername(e.target.value)} autoComplete='on' required />
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='email'>Email</Label>
									<Input id='email' type='email' placeholder='e@example.com' value={email} onChange={e => setEmail(e.target.value)} autoComplete='on' required />
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='password'>Password</Label>
									<Input id='password' type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='********' autoComplete='on' required />
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='password-repeat'> Confirm Password</Label>
									<Input id='password-repeat' type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder='********' autoComplete='on' required />
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
