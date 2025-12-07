import { useDispatch, useSelector } from 'react-redux';
import { events } from '../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../custom-hooks/authorize-provider';
import Person from '../models/entities/Person';
import { insertAttendance } from '../repositories/attendance-queries';
import {
  getScannerLogCount,
  scanEventQRCode,
} from '../repositories/event-queries';
import { scanPersonQRCode } from '../repositories/person-queries';
import { SystemModules } from '../routes';
import { userProfileActions } from '../state/reducers/user-profile-reducer';
import { RootState } from '../state/store';
import QRCodeReader from './modals/qrcode-reader';
import MainScanner from './scanner-component/main-scanner';
import PersonVerifier from './scanner-component/person-verifier';
import { getRemainingInventory } from '../repositories/event-inventory-queries';

export default function Dashboard() {
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const qrcodeReaderState = useSelector(
    (state: RootState) => state.qrcodeReader
  );
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();

  async function fetchScannerLogCount(eventId: number) {
    setBusy(true);
    await getScannerLogCount(userProfileState.systemUser?.id ?? 0, eventId)
      .then((res) => {
        console.log(res);
        dispatch(userProfileActions.setScannerLogCount(res ?? 0));
      })
      .catch((err) => setToasterMessage({ content: err.message }))
      .finally(() => setBusy(false));
  }

  async function fetchRemainingInventory(eventId: number) {
    setBusy(true);
    await getRemainingInventory(userProfileState.systemUser?.id ?? 0, eventId)
      .then((res) => {
        console.log(res);
        dispatch(userProfileActions.setRemainingInventory(res ?? 0));
      })
      .catch((err) => setToasterMessage({ content: err.message }))
      .finally(() => setBusy(false));
  }
  async function onQRRead(qrCode: string) {
    setBusy(true);
    if (userProfileState.eventId === 0) {
      await scanEventQRCode(qrCode)
        .then(async (res) => {
          if (res) {
            await fetchScannerLogCount(res.id);
            await fetchRemainingInventory(res.id);
            dispatch(userProfileActions.setEvent(res));
            window.location.href = SystemModules.Scanner;
          }
        })
        .catch((err) => setToasterMessage({ content: err.message }))
        .finally(() => setBusy(false));
    } else {
      await scanPersonQRCode(qrCode)
        .then(async (res) => {
          if (res) {
            if (userProfileState.eventId === 2) {
              await attend(res);
            } else {
              dispatch(userProfileActions.setPerson(res));
              dispatch(userProfileActions.setScreen(2));
            }
          }
        })
        .catch(() => dispatch(userProfileActions.setScreen(2)))
        .finally(() => setBusy(false));
    }
  }
  async function attend(person: Person) {
    await insertAttendance(
      person.id,
      userProfileState.systemUser?.employee?.officeId ?? 0
    ).then((x) => {
      if (x) {
        dispatch(userProfileActions.setPerson(person));
        dispatch(userProfileActions.setScreen(2));
      }
    });
  }
  return (
    <div className='body-content'>
      {userProfileState.screen === 1 && <MainScanner />}
      {userProfileState.screen === 2 && <PersonVerifier />}

      {qrcodeReaderState.isModalShow && (
        <QRCodeReader
          onClose={onQRRead}
          title={`Scan QR Code (${events[userProfileState.eventId]})`}
        />
      )}
    </div>
  );
}
