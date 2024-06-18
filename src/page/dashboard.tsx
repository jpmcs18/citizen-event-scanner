import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../custom-hooks/authorize-provider';
import { scanEventQRCode } from '../repositories/event-queries';
import { SystemModules } from '../routes';
import { qrcodeReaderActions } from '../state/reducers/qrcode-reader-reducer';
import { userProfileActions } from '../state/reducers/user-profile-reducer';
import { RootState } from '../state/store';
import QRCodeReader from './modals/qrcode-reader';
import { useEffect } from 'react';

export default function Dashboard() {
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const qrcodeReaderState = useSelector(
    (state: RootState) => state.qrcodeReader
  );
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();

  function scanQRCode() {
    dispatch(qrcodeReaderActions.setShowModal(true));
  }
  async function onQRRead(qrCode: string) {
    setBusy(true);
    await scanEventQRCode(qrCode)
      .then((res) => {
        if (res) {
          dispatch(userProfileActions.setEvent(res));
          window.location.href = SystemModules.Scanner;
        }
      })
      .catch((err) => setToasterMessage({ content: err.message }))
      .finally(() => setBusy(false));
  }
  useEffect(
    () => {
      if (userProfileState.event) {
        window.location.href = SystemModules.Scanner;
      }
    },
    //eslint-disable-next-line
    []
  );

  return (
    <div className='body-content'>
      <div className='main-display-text'>
        Hi {userProfileState.systemUser?.displayName}!
      </div>
      <button className='btn' onClick={scanQRCode}>
        Scan Event QR Code
      </button>
      {qrcodeReaderState.isModalShow && <QRCodeReader onClose={onQRRead} />}
    </div>
  );
}
