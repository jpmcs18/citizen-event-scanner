import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Event from '../../models/entities/Event';
import Person from '../../models/entities/Person';
import SystemUser from '../../models/entities/SystemUser';
import TokenData from '../../models/entities/TokenData';
import {
  clearSession,
  clearSessionEvent,
  getScanner,
  getSessionEvent,
  getSessionProfile,
  getToken,
  saveScanner,
  saveSessionEvent,
  saveSessionProfile,
} from '../../repositories/session-managers';

interface State {
  authorize: boolean | undefined;
  systemUser: SystemUser | undefined;
  token: TokenData | undefined;
  event: Event | undefined;
  person: Person | undefined;
  screen: number;
  isScanner: boolean;
  eventId: number;
}

const initialState: State = {
  authorize: undefined,
  systemUser: undefined,
  token: undefined,
  event: undefined,
  person: undefined,
  screen: 1,
  isScanner: false,
  eventId: 0,
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
        state.isScanner = getScanner();
        isClearSession = state.systemUser === undefined;
      }

      if (isClearSession) {
        state.systemUser = undefined;
        state.authorize = false;
        state.event = undefined;
        state.eventId = 0;
        clearSession();
      }
    },
    setEventId(state, action: PayloadAction<number>) {
      state.eventId = action.payload;
    },
    setIsScanner(state, action: PayloadAction<boolean>) {
      state.isScanner = action.payload;
      saveScanner(action.payload);
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
        state.eventId = 0;
        state.isScanner = false;
        clearSession();
      }
    },
    clearProfile(state) {
      state.systemUser = undefined;
      state.authorize = false;
      state.event = undefined;
      state.eventId = 0;
      state.isScanner = false;
      clearSession();
    },
    saveSession(state) {
      saveSessionProfile(state.systemUser!);
    },
    setEvent(state, action: PayloadAction<Event | undefined>) {
      state.event = action.payload;
      saveSessionEvent(action.payload!);
    },
    setPerson(state, action: PayloadAction<Person | undefined>) {
      state.person = action.payload;
    },
    setScreen(state, action: PayloadAction<number>) {
      state.screen = action.payload;
    },
    clearEvent(state) {
      state.event = undefined;
      clearSessionEvent();
    },
  },
});

export default userProfileSlice.reducer;
export const userProfileActions = userProfileSlice.actions;
