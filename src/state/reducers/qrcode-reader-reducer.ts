import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface State {
  isModalShow: boolean;
}
const initialState: State = {
  isModalShow: false,
};

const qrcodeReaderSlice = createSlice({
  name: 'qrcode-reader',
  initialState: initialState,
  reducers: {
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
  },
});

export default qrcodeReaderSlice.reducer;
export const qrcodeReaderActions = qrcodeReaderSlice.actions;
