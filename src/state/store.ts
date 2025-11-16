import { configureStore } from '@reduxjs/toolkit';
import barcodeReaderReducer from './reducers/barcode-reader-reducer';
import dropdownReducer from './reducers/dropdown-reducer';
import loginReducer from './reducers/login-reducer';
import qrcodeReaderReducer from './reducers/qrcode-reader-reducer';
import scannerReducer from './reducers/scanner-reducer';
import stubReducer from './reducers/stub-reducer';
import stubViewerReducer from './reducers/stub-viewer-reducer';
import userProfileReducer from './reducers/user-profile-reducer';
const store = configureStore({
  reducer: {
    userProfile: userProfileReducer,
    dropdown: dropdownReducer,
    login: loginReducer,
    qrcodeReader: qrcodeReaderReducer,
    barcodeReader: barcodeReaderReducer,
    scanner: scannerReducer,
    stubViewer: stubViewerReducer,
    stub: stubReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
