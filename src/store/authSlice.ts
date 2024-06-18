import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
	isLoggedIn: boolean;
	user: {
		id: string;
		username: string;
		email: string;
		admin: boolean;
	} | null;
}

const initialState: AuthState = {
	isLoggedIn: localStorage.getItem('user') ? true : false,
	user: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<{ id: string; username: string; email: string; admin: boolean }>) => {
			console.log(action.payload);
			state.isLoggedIn = true;
			state.user = action.payload;
			localStorage.setItem('user', JSON.stringify(action.payload));
		},
		logout: state => {
			state.isLoggedIn = false;
			state.user = null;
			localStorage.removeItem('user');
		},
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
