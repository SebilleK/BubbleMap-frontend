import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { Button } from './ui/button';
import bubblemapLogo from '../assets/bubblemap-icon.png';

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
		<nav className='flex flex-col items-center justify-center justify-items-center bg-white p-2 shadow'>
			<div className='flex flex-row items-center justify-center gap-4 text-2xl'>
				<img src={bubblemapLogo} alt='Bubblemap Icon' />
				<h1 className='text-yellow-800 font-mono font-bold'>BubbleMap</h1>
			</div>

			<ul className='flex flex-row gap-4'>
				<li>
					<a className='text-red-300 hover:text-yellow-800 hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-red-300'>
						<Link to='/home'>Home</Link>
					</a>
				</li>
				<li>
					<a className='text-red-300 hover:text-yellow-800 hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-red-300'>
						<Link to='/about'>About</Link>
					</a>
				</li>
				{!isLoggedIn && (
					<>
						<a className='text-red-300 hover:text-yellow-800 hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-red-300'>
							<li>
								<Link to='/login'>Login</Link>
							</li>
						</a>
						<a className='text-red-300 hover:text-yellow-800 hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-red-300'>
							<li>
								<Link to='/register'>Register</Link>
							</li>
						</a>
					</>
				)}
				{isLoggedIn && (
					<>
						<a className='text-red-300 hover:text-yellow-800 hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-red-300'>
							<li>
								<Link to='/profile'>Profile</Link>
							</li>
						</a>
						<a className='text-red-300 hover:text-yellow-800 hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-red-300'>
							<li>
								<Button onClick={handleLogout}>Logout</Button>
							</li>
						</a>
					</>
				)}
			</ul>
		</nav>
	);
}
