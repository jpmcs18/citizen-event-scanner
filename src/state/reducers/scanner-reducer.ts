import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import EventPerson from '../../models/response-model/EventPerson';
import Person from '../../models/entities/Person';

interface State {
  person: EventPerson | undefined;
  screen: number;
  approverPasscode: string | undefined;
  isAttendance: boolean;
  isClaim: boolean;
  photo: string | undefined;
  approvedId: number | undefined;
  hasRepresentative: boolean;
  representative: Person | undefined;
}

const initialState: State = {
  person: undefined,
  screen: 1,
  approverPasscode: undefined,
  isAttendance: false,
  isClaim: false,
  photo: undefined,
  approvedId: undefined,
  hasRepresentative: false,
  representative: undefined,
};

const scannerSlice = createSlice({
  name: 'scanner',
  initialState: initialState,
  reducers: {
    setPerson(state, action: PayloadAction<EventPerson | undefined>) {
      state.person = action.payload;
    },
    setScreen(state, action: PayloadAction<number>) {
      state.screen = action.payload;
      if (action.payload === 1) {
        state.approverPasscode = undefined;
        state.approvedId = undefined;
        state.person = undefined;
        state.isClaim = false;
        state.isAttendance = false;
        state.photo = undefined;
        state.hasRepresentative = false;
      }
      if (action.payload === 3) {
        state.approverPasscode = undefined;
        state.approvedId = undefined;
      }
    },
    setActionAsAttendance(state) {
      state.isAttendance = true;
      state.isClaim = false;
    },
    setActionAsClaim(state) {
      state.isClaim = true;
      state.isAttendance = false;
    },
    clearAction(state) {
      state.isClaim = false;
      state.isAttendance = false;
      state.hasRepresentative = false;
    },
    setApproverPasscode(state, action: PayloadAction<string | undefined>) {
      state.approverPasscode = action.payload;
    },
    setApproverId(state, action: PayloadAction<number | undefined>) {
      state.approvedId = action.payload;
    },
    setPhoto(state, action: PayloadAction<string | undefined>) {
      state.photo = action.payload;
    },
    setHasRepresentative(state, action: PayloadAction<boolean>) {
      state.hasRepresentative = action.payload;
    },
    setRepresentative(state, action: PayloadAction<Person | undefined>) {
      state.representative = action.payload;
    },
  },
});

export default scannerSlice.reducer;
export const scannerActions = scannerSlice.actions;
