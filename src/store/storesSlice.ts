import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StoreState {
	stores: any;
	alert: boolean;
	storeInfo: any;
}

const initialState: StoreState = {
	stores: [],
	alert: false,
	storeInfo: {},
};

const storeSlice = createSlice({
	name: 'stores',
	initialState,
	reducers: {
		setStores: (state, action: PayloadAction<any>) => {
			state.stores = action.payload;
		},

		setAlert: (state, action: PayloadAction<boolean>) => {
			state.alert = action.payload;
		},

		setStoreInfo: (state, action: PayloadAction<any>) => {
			state.storeInfo = action.payload;
		},
	},
});

export const { setStores, setAlert, setStoreInfo } = storeSlice.actions;

export default storeSlice.reducer;
