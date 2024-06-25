import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { Button } from './ui/button';

import bubblemapLogo from '../assets/bubbletea-icon-black.png';

export default function HomepageNavbar() {
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
		<nav className='flex flex-col items-center justify-center bg-white shadow w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto rounded-b-lg fixed p-1 z-10'>
			<div className='flex flex-row items-center justify-center gap-4 text-2xl p-2'>
				<img src={bubblemapLogo} alt='Bubblemap Icon' />
				<h1 className='font-mono font-bold text-3xl'>BubbleMap</h1>
			</div>

			<ul className='p-2 flex flex-row gap-4 text-xl'>
				<li>
					<Link className='hover:text-green-800 hover:underline hover:text-xl hover:underline-offset-4 hover:animate-in  hover:decoration-2 ' to='/home'>
						Home
					</Link>
				</li>
				<li>
					<Link className='hover:text-green-800 hover:underline hover:text-xl hover:underline-offset-4 hover:animate-in  hover:decoration-2 ' to='/about'>
						About
					</Link>
				</li>
				{!isLoggedIn && (
					<>
						<li className='hover:text-green-800 hover:underline hover:text-xl hover:underline-offset-4 hover:animate-in  hover:decoration-2 '>
							<Link to='/login'>Login</Link>
						</li>

						<li className='hover:text-green-800 hover:underline hover:text-xl hover:underline-offset-4 hover:animate-in  hover:decoration-2 '>
							<Link to='/register'>Register</Link>
						</li>
					</>
				)}
				{isLoggedIn && (
					<>
						<li className='hover:text-green-800 hover:underline hover:text-xl hover:underline-offset-4 hover:animate-in  hover:decoration-2 '>
							<Link to='/profile'>Profile</Link>
						</li>

						<li className='hover:text-green-800 hover:underline hover:text-xl hover:underline-offset-4 hover:animate-in  hover:decoration-2 '>
							<Button className='h-6 text-lg py-4' onClick={handleLogout}>
								Logout
							</Button>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}
