import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface State {
  isModalShow: boolean;
}
const initialState: State = {
  isModalShow: false,
};

const barcodeReaderSlice = createSlice({
  name: 'barcode-reader',
  initialState: initialState,
  reducers: {
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
  },
});

export default barcodeReaderSlice.reducer;
export const barcodeReaderActions = barcodeReaderSlice.actions;
