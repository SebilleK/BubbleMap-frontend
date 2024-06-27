import ReactDOM from 'react-dom/client';
import './index.css';

// React Redux
import { Provider } from 'react-redux';
import store from './store';

// React Router + Pages
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/about_page/AboutPage.tsx';
import Login from './components/login_and_register_pages/LoginPage';
import Home from './components/home_page/HomePage.tsx';
import Register from './components/login_and_register_pages/RegisterPage';
import Profile from './components/profile_page/ProfilePage.tsx';
import AdminPage from './components/admin_page/AdminPage.tsx';

// Theme Provider
import { ThemeProvider } from './theme/ThemeProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/home' element={<Home />} />
					<Route path='/about' element={<About />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/admin' element={<AdminPage />} />
				</Routes>
			</Router>
		</ThemeProvider>
	</Provider>,
);
