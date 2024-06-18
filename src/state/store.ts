import { configureStore } from '@reduxjs/toolkit';
import dropdownReducer from './reducers/dropdown-reducer';
import loginReducer from './reducers/login-reducer';
import userProfileReducer from './reducers/user-profile-reducer';
import qrcodeReaderReducer from './reducers/qrcode-reader-reducer';
import scannerReducer from './reducers/scanner-reducer';
const store = configureStore({
  reducer: {
    userProfile: userProfileReducer,
    dropdown: dropdownReducer,
    login: loginReducer,
    qrcodeReader: qrcodeReaderReducer,
    scanner: scannerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
