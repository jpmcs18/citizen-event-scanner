import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { useDispatch } from 'react-redux';
import { scannerActions } from '../../state/reducers/scanner-reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function RepresentativeConfirmation() {
  const scannerState = useSelector((state: RootState) => state.scanner);
  const dispatch = useDispatch();
  function cancel() {
    dispatch(scannerActions.setScreen(1));
  }
  function confirm() {
    dispatch(scannerActions.setScreen(6));
  }
  return (
    <>
      <div className='name'>{scannerState.representative?.fullName}</div>
      <div
        className={
          'name ' +
          (scannerState.person?.verificationStatusId === 2
            ? 'text-green'
            : 'text-red')
        }>
        {scannerState.person?.verificationStatusId === 2
          ? 'VERIFIED'
          : 'UNVERIFIED'}
      </div>
      <img
        className='image'
        src={scannerState.representative?.selfieBase64}
        alt={scannerState.representative?.fullName}
      />
      <p className='caption text-green'>
        <FontAwesomeIcon icon={faCheckCircle} className='text-icon' />
        <span>You've been approved to represent</span>
      </p>
      <p className='caption text-red'>
        <span>{scannerState.person?.fullName}</span>
      </p>
      <button className='btn color-green' onClick={confirm}>
        Confirm
      </button>
      <button className='btn btn-cancel' onClick={cancel}>
        Cancel
      </button>
    </>
  );
}
