import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Stub from '../../models/entities/Stub';

interface State {
  stub: Stub | undefined;
  isModalShow: boolean;
  isAutoPrint: boolean;
  initiateAutoPrint: boolean;
}

const initialState: State = {
  stub: undefined,
  isModalShow: false,
  isAutoPrint: false,
  initiateAutoPrint: false,
};

const stubViewerSlice = createSlice({
  name: 'stub-viewer',
  initialState: initialState,
  reducers: {
    setStub(state, action: PayloadAction<Stub | undefined>) {
      state.stub = action.payload;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
      if (!action.payload) {
        state.isAutoPrint = false;
        state.stub = undefined;
      }
    },
    setAutoPrint(state, action: PayloadAction<boolean>) {
      state.isAutoPrint = action.payload;
    },
    setInitiateAutoPrint(state, action: PayloadAction<boolean>) {
      state.initiateAutoPrint = action.payload;
    },
  },
});

export default stubViewerSlice.reducer;
export const stubViewerActions = stubViewerSlice.actions;
