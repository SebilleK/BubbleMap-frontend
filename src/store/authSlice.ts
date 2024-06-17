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
	isLoggedIn: false,
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
		},
		logout: state => {
			state.isLoggedIn = false;
			state.user = null;
		},
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
