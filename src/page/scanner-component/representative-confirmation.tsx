import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { useDispatch } from 'react-redux';
import { scannerActions } from '../../state/reducers/scanner-reducer';

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
      <div className='sub-name'>Hello!</div>
      <div className='name text-red'>
        {scannerState.representative?.fullName}
      </div>
      <div className='displayed-text'>You've been approved to represent</div>
      <div className='name'>{scannerState.person?.fullName}</div>
      <button className='btn color-green' onClick={confirm}>
        Confirm
      </button>
      <button className='btn btn-cancel' onClick={cancel}>
        Cancel
      </button>
    </>
  );
}
