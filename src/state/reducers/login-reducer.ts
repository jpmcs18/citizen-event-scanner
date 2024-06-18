import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import CustomReturn from '../../models/client-model/CustomReturn';
import LoginRequest from '../../models/request-model/LoginRequest';

interface State {
  screen: number;
  user: LoginRequest;
}

const initialState: State = {
  screen: 0,
  user: {
    username: '',
    password: '',
  },
};
const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    setScreen(state, action: PayloadAction<number>) {
      state.screen = action.payload;
    },
    setUser(state, action: PayloadAction<CustomReturn>) {
      state.user = {
        ...state.user,
        [action.payload.elementName]: action.payload.value,
      };
    },
    clear(state) {
      state.user = { username: '', password: '' };
    },
  },
});

export default loginSlice.reducer;
export const loginActions = loginSlice.actions;
