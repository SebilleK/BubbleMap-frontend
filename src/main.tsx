import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// React Redux
import { Provider } from 'react-redux';
import store from './store';

// React Router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/AboutPage';
import Login from './components/LoginPage';
import Home from './components/HomePage';
import Register from './components/RegisterPage';
import Profile from './components/ProfilePage';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/home' element={<Home />} />
					<Route path='/about' element={<About />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/profile' element={<Profile />} />
				</Routes>
			</Router>
		</Provider>
	</React.StrictMode>,
);
