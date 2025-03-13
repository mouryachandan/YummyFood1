import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AddressState {
  receiverName: string;
  houseNumber: string;
  address: string;
  nearbyLandmark: string;
  phoneNumber: string;
}

const initialState: AddressState = {
  receiverName: '',
  houseNumber: '',
  address: '',
  nearbyLandmark: '',
  phoneNumber: '',
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<AddressState>) => {
      state.receiverName = action.payload.receiverName;
      state.houseNumber = action.payload.houseNumber;
      state.address = action.payload.address;
      state.nearbyLandmark = action.payload.nearbyLandmark;
      state.phoneNumber = action.payload.phoneNumber;
    },
  },
});

export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;
