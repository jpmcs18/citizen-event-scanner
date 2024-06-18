import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import ScannerMainDisplay from './scanner-component/scanner-main-display';
import PersonScanConfirmation from './scanner-component/person-scan-confirmation';
import QRCodeReader from './modals/qrcode-reader';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../custom-hooks/authorize-provider';
import { scanPersonQRCode } from '../repositories/person-queries';
import { useDispatch } from 'react-redux';
import { scannerActions } from '../state/reducers/scanner-reducer';
import { SystemModules } from '../routes';
import { scanEventPersonQRCode } from '../repositories/event-queries';
import Approval from './scanner-component/approval';
import CapturePhoto from './scanner-component/capture-photo';
import SuccessMessage from './components/success-message';
import SuccessScan from './scanner-component/success-scan';

export default function ScannerPage() {
  const scannerState = useSelector((state: RootState) => state.scanner);
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const qrcodeReaderState = useSelector(
    (state: RootState) => state.qrcodeReader
  );
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const dispatch = useDispatch();
  useEffect(
    () => {
      if (!userProfileState.event) {
        window.location.href = SystemModules.Home;
      }
    },
    //eslint-disable-next-line
    []
  );
  async function onQRRead(qrCode: string) {
    setBusy(true);
    await scanEventPersonQRCode(qrCode, userProfileState.event?.id ?? 0)
      .then((res) => {
        if (res) {
          dispatch(scannerActions.setPerson(res));
          dispatch(scannerActions.setScreen(2));
        } else {
          setToasterMessage({ content: 'Invalid QR Code' });
        }
      })
      .catch((err) => setToasterMessage({ content: err.message }))
      .finally(() => setBusy(false));
  }
  return (
    <div className='body-content'>
      {scannerState.screen === 1 && <ScannerMainDisplay />}
      {scannerState.screen === 2 && <PersonScanConfirmation />}
      {scannerState.screen === 3 && <Approval />}
      {scannerState.screen === 4 && <CapturePhoto />}
      {scannerState.screen === 5 && <SuccessScan />}
      {qrcodeReaderState.isModalShow && <QRCodeReader onClose={onQRRead} />}
    </div>
  );
}
