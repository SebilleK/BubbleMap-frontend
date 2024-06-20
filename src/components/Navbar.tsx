import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { Button } from './ui/button';

import bubblemapLogo from '../assets/bubbletea-icon-black.png';

export default function Navbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

	const handleLogout = () => {
		console.log('logging out...');
		// dispatch logout action
		dispatch(logout());
		console.log('logged out state set successfully');

		// clear auth cookie
		document.cookie = 'cookieAuth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		console.log('auth cookie cleared successfully!');

		console.log('redirecting home...');
		// redirect home
		navigate('/home');
	};

	return (
		<nav className='flex flex-col items-center justify-center justify-items-center bg-white p-1 shadow w-1/2 mx-auto rounded-b-lg'>
			<div className='flex flex-row items-center justify-center gap-4 text-2xl p-2'>
				<img src={bubblemapLogo} alt='Bubblemap Icon' />
				<h1 className='font-mono font-bold text-3xl'>BubbleMap</h1>
			</div>

			<ul className='p-2 flex flex-row gap-4 text-xl'>
				<li>
					<a className='hover:text-green-800 hover:underline hover:text-xl hover:underline-offset-4 hover:animate-in  hover:decoration-2 '>
						<Link to='/home'>Home</Link>
					</a>
				</li>
				<li>
					<a className='hover:text-green-800 hover:underline hover:underline-offset-4 hover:decoration-2 '>
						<Link to='/about'>About</Link>
					</a>
				</li>
				{!isLoggedIn && (
					<>
						<a className='hover:text-green-800 hover:underline hover:underline-offset-4 hover:decoration-2 '>
							<li>
								<Link to='/login'>Login</Link>
							</li>
						</a>
						<a className=' hover:text-green-800 hover:underline hover:underline-offset-4 hover:decoration-2 '>
							<li>
								<Link to='/register'>Register</Link>
							</li>
						</a>
					</>
				)}
				{isLoggedIn && (
					<>
						<a className=' hover:text-green-800 hover:underline hover:underline-offset-4 hover:decoration-2 '>
							<li>
								<Link to='/profile'>Profile</Link>
							</li>
						</a>
						<a className=' text-red-300 hover:text-green-800 hover:underline hover:underline-offset-4 hover:decoration-2 '>
							<li>
								<Button className='h-6 text-lg py-4' onClick={handleLogout}>
									Logout
								</Button>
							</li>
						</a>
					</>
				)}
			</ul>
		</nav>
	);
}
