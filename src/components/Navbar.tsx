import { Link } from 'react-router-dom';

export default function Navbar() {
	return (
		<nav>
			<ul>
				<li>
					<Link to='/home'>Home</Link>
				</li>
				<li>
					<Link to='/about'>About</Link>
				</li>
				<li>
					<Link to='/login'>Login</Link>
				</li>
			</ul>
		</nav>
	);
}
