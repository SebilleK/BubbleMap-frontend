import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StoreState {
	stores: any;
}

const initialState: StoreState = {
	stores: [],
};

const storeSlice = createSlice({
	name: 'stores',
	initialState,
	reducers: {
		setStores: (state, action: PayloadAction<any>) => {
			state.stores = action.payload;
		},
	},
});

export const { setStores } = storeSlice.actions;

export default storeSlice.reducer;
