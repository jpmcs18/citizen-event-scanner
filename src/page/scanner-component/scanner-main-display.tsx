import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { useDispatch } from 'react-redux';
import { scannerActions } from '../../state/reducers/scanner-reducer';
import { qrcodeReaderActions } from '../../state/reducers/qrcode-reader-reducer';

export default function ScannerMainDisplay() {
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  function scanAttendance() {
    dispatch(scannerActions.setActionAsAttendance());
    dispatch(qrcodeReaderActions.setShowModal(true));
  }
  function scanClaim() {
    dispatch(scannerActions.setActionAsClaim());
    dispatch(qrcodeReaderActions.setShowModal(true));
  }
  return (
    <>
      <div className='main-display-text'>
        {userProfileState.event?.description}
      </div>
      {userProfileState.event?.attendanceScan && (
        <button className='btn color-green' onClick={scanAttendance}>
          Scan QR Code for Attendance
        </button>
      )}
      {userProfileState.event?.claimScan && (
        <button className='btn' onClick={scanClaim}>
          Scan QR Code for Claiming
        </button>
      )}
    </>
  );
}
