import React from 'react';
import errorLogo from '../../icons/error_.png';
import { useDispatch, useSelector } from 'react-redux';
import { scannerActions } from '../../state/reducers/scanner-reducer';
import { RootState } from '../../state/store';
export default function BarangayNotScheduled() {
  const scannerState = useSelector((state: RootState) => state.scanner);
  const dispatch = useDispatch();
  return (
    <div className='error-scan'>
      <img src={errorLogo} alt='error' />
      <div className='text'>BARANGAY IS NOT SCHEDULED</div>
      <div className='text text-red'>{scannerState.person?.barangay}</div>
      <button
        className='btn color-green'
        onClick={() => dispatch(scannerActions.setScreen(1))}>
        CONTINUE
      </button>
    </div>
  );
}
