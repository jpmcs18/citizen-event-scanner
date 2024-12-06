import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { useDispatch } from 'react-redux';
import { scannerActions } from '../../state/reducers/scanner-reducer';
import { qrcodeReaderActions } from '../../state/reducers/qrcode-reader-reducer';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { scanEventPersonQRCode } from '../../repositories/event-queries';
import QRCodeReader from '../modals/qrcode-reader';
import { validateDate } from '../../helper';

export default function ScannerMainDisplay() {
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const qrcodeReaderState = useSelector(
    (state: RootState) => state.qrcodeReader
  );
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const dispatch = useDispatch();

  function scanAttendance() {
    dispatch(scannerActions.setActionAsAttendance());
    dispatch(qrcodeReaderActions.setShowModal(true));
    dispatch(scannerActions.setHasRepresentative(false));
  }
  function scanClaim() {
    dispatch(scannerActions.setActionAsClaim());
    dispatch(qrcodeReaderActions.setShowModal(true));
    dispatch(scannerActions.setHasRepresentative(false));
  }

  function scanAttendanceR() {
    dispatch(scannerActions.setActionAsAttendance());
    dispatch(scannerActions.setHasRepresentative(true));
    dispatch(qrcodeReaderActions.setShowModal(true));
  }
  function scanClaimR() {
    dispatch(scannerActions.setActionAsClaim());
    dispatch(qrcodeReaderActions.setShowModal(true));
    dispatch(scannerActions.setHasRepresentative(true));
  }
  async function onQRRead(qrCode: string) {
    setBusy(true);
    await scanEventPersonQRCode(qrCode, userProfileState.event?.id ?? 0)
      .then((res) => {
        if (res) {
          if (res.checkAppointment && !validateDate(res.appointmentDate)) {
            dispatch(scannerActions.setScreen(8));
            return;
          }
          if (
            !userProfileState.event?.isTargetIndividualBenefeciaries &&
            !res.isFamilyConfirmed
          ) {
            dispatch(scannerActions.setScreen(9));
            return;
          }
          if (!res?.isScheduledBarangay) {
            dispatch(scannerActions.setPerson(res));
            dispatch(scannerActions.setScreen(10));
            return;
          }
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
    <div className='container'>
      <div className='main-display-text'>
        {userProfileState.event?.description}
      </div>
      {userProfileState.event?.attendanceScan && (
        <>
          <button className='btn color-green' onClick={scanAttendance}>
            Scan QR Code for Attendance
          </button>
          <button className='btn color-green' onClick={scanAttendanceR}>
            Scan QR Code for Representative Attendance
          </button>
        </>
      )}
      {userProfileState.event?.claimScan && (
        <>
          <button className='btn' onClick={scanClaim}>
            Scan QR Code for Claiming
          </button>
          {!userProfileState.event?.attendanceScan && (
            <button className='btn' onClick={scanClaimR}>
              Scan QR Code for Representative Claiming
            </button>
          )}
        </>
      )}
      {qrcodeReaderState.isModalShow && (
        <QRCodeReader
          onClose={onQRRead}
          title="Scan the Beneficiary's QR Code"
        />
      )}
    </div>
  );
}
