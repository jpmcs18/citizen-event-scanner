import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StubResponse } from '../../models/entities/StubResponse';

interface State {
  stub: StubResponse | undefined;
}
var initialState: State = {
  stub: undefined,
};
var stubSlice = createSlice({
  name: 'stub',
  initialState: initialState,
  reducers: {
    setStub(state, action: PayloadAction<StubResponse | undefined>) {
      state.stub = action.payload;
    },
  },
});

export default stubSlice.reducer;
export const stubActions = stubSlice.actions;
