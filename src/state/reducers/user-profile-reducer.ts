import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Event from '../../models/entities/Event';
import Person from '../../models/entities/Person';
import SystemUser from '../../models/entities/SystemUser';
import TokenData from '../../models/entities/TokenData';
import {
  clearSession,
  clearSessionEvent,
  getInventory,
  getScanLog,
  getScanner,
  getSessionEvent,
  getSessionProfile,
  getToken,
  saveInventory,
  saveScanLog,
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
  isStubScanner: boolean;
  eventId: number;
  scannerLogCount: number;
  remainingInventory: number;
}

const initialState: State = {
  authorize: undefined,
  systemUser: undefined,
  token: undefined,
  event: undefined,
  person: undefined,
  screen: 1,
  isScanner: false,
  isStubScanner: false,
  eventId: 0,
  scannerLogCount: 0,
  remainingInventory: 0,
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
        state.scannerLogCount = +(getScanLog() ?? 0);
        state.remainingInventory = +(getInventory() ?? 0);
        isClearSession = state.systemUser === undefined;
      }

      if (isClearSession) {
        state.systemUser = undefined;
        state.authorize = false;
        state.event = undefined;
        state.eventId = 0;
        state.isStubScanner = false;
        state.scannerLogCount = 0;
        state.remainingInventory = 0;
        clearSession();
      }
    },
    setIsStubScanner(state, action: PayloadAction<boolean>) {
      state.isStubScanner = action.payload;
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
        state.scannerLogCount = 0;
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
    setScannerLogCount(state, action: PayloadAction<number>) {
      state.scannerLogCount = action.payload;
      saveScanLog(action.payload.toString()!);
    },
    setRemainingInventory(state, action: PayloadAction<number>) {
      state.remainingInventory = action.payload;
      saveInventory(action.payload.toString()!);
    },
    clearEvent(state) {
      state.event = undefined;
      clearSessionEvent();
    },
  },
});

export default userProfileSlice.reducer;
export const userProfileActions = userProfileSlice.actions;
