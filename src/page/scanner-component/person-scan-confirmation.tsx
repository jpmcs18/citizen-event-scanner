import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { useDispatch } from 'react-redux';
import { scannerActions } from '../../state/reducers/scanner-reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faCheckCircle,
  faTimes,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

export default function PersonScanConfirmation() {
  const scannerState = useSelector((state: RootState) => state.scanner);
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();

  function confirm() {
    dispatch(scannerActions.setScreen(4));
  }
  function approve() {
    dispatch(scannerActions.setScreen(3));
  }
  function cancel() {
    dispatch(scannerActions.setScreen(1));
  }
  return (
    <>
      <div className='sub-name'>Hello!</div>
      <div className='name'>{scannerState.person?.fullName}</div>
      <img
        className='image'
        src={scannerState.person?.selfieBase64}
        alt={scannerState.person?.fullName}
      />
      {!scannerState.person?.isInTheList && (
        <>
          <p className='not-in-list'>
            <FontAwesomeIcon icon={faTimesCircle} /> NOT IN THE LIST
          </p>
        </>
      )}
      {(scannerState.isAttendance &&
        scannerState.person?.isAttendanceScanned) ||
      (scannerState.isClaim && scannerState.person?.isClaimScanned) ? (
        <p className='not-in-list text-green'>
          <FontAwesomeIcon icon={faCheckCircle} /> ALREADY SCANNED
        </p>
      ) : !scannerState.person?.isInTheList &&
        userProfileState.event?.scanningTypeId === 2 ? (
        <button className='btn color-green' onClick={approve}>
          Approve
        </button>
      ) : (
        <button className='btn color-green' onClick={confirm}>
          Confirm
        </button>
      )}
      <button className='btn btn-cancel' onClick={cancel}>
        Cancel
      </button>
    </>
  );
}
