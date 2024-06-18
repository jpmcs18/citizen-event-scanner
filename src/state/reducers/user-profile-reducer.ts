import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import SystemUser from '../../models/entities/SystemUser';
import TokenData from '../../models/entities/TokenData';
import {
  clearSession,
  clearSessionEvent,
  getSessionEvent,
  getSessionProfile,
  getToken,
  saveSessionEvent,
  saveSessionProfile,
} from '../../repositories/session-managers';
import Event from '../../models/entities/Event';

interface State {
  authorize: boolean | undefined;
  systemUser: SystemUser | undefined;
  token: TokenData | undefined;
  event: Event | undefined;
}

const initialState: State = {
  authorize: undefined,
  systemUser: undefined,
  token: undefined,
  event: undefined,
};

const userProfileSlice = createSlice({
  name: 'user-profile',
  initialState: initialState,
  reducers: {
    initializeState(state) {
      var token = getToken();
      var isClearSession = true;
      if (token?.token !== undefined) {
        state.authorize = true;
        state.systemUser = getSessionProfile();
        state.event = getSessionEvent();
        isClearSession = state.systemUser === undefined;
      }

      if (isClearSession) {
        state.systemUser = undefined;
        state.authorize = false;
        state.event = undefined;
        clearSession();
      }
    },
    setProfile(state, action: PayloadAction<SystemUser>) {
      state.systemUser = action.payload;
    },
    setAuthorize(state, action: PayloadAction<boolean>) {
      state.authorize = action.payload;
      if (!action.payload) {
        state.systemUser = undefined;
        state.authorize = false;
        state.event = undefined;
        clearSession();
      }
    },
    clearProfile(state) {
      state.systemUser = undefined;
      state.authorize = false;
      state.event = undefined;
      clearSession();
    },
    saveSession(state) {
      saveSessionProfile(state.systemUser!);
    },
    setEvent(state, action: PayloadAction<Event | undefined>) {
      state.event = action.payload;
      saveSessionEvent(action.payload!);
    },
    clearEvent(state) {
      state.event = undefined;
      clearSessionEvent();
    },
  },
});

export default userProfileSlice.reducer;
export const userProfileActions = userProfileSlice.actions;
