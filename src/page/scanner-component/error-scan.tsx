import React from 'react';
import errorLogo from '../../icons/error_.png';
import { useDispatch } from 'react-redux';
import { scannerActions } from '../../state/reducers/scanner-reducer';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
export default function ErrorScan() {
  const scannerState = useSelector((state: RootState) => state.scanner);
  const dispatch = useDispatch();
  return (
    <div className='error-scan'>
      <img src={errorLogo} alt='error' />
      <div className='text'>{scannerState.error}</div>
      {scannerState.subError && (
        <div className='text text-red'>{scannerState.subError}</div>
      )}
      <button
        className='btn color-green'
        onClick={() => dispatch(scannerActions.setScreen(1))}>
        CONTINUE
      </button>
    </div>
  );
}
