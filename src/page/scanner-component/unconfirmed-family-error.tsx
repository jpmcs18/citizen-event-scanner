import React from 'react';
import errorLogo from '../../icons/error_.png';
import { useDispatch } from 'react-redux';
import { scannerActions } from '../../state/reducers/scanner-reducer';
export default function UnconfirmedFamilyError() {
  const dispatch = useDispatch();
  return (
    <div className='error-scan'>
      <img src={errorLogo} alt='error' />
      <div className='text'>FAMILY HAS NOT BEEN APPROVED</div>
      <button
        className='btn color-green'
        onClick={() => dispatch(scannerActions.setScreen(1))}>
        CONTINUE
      </button>
    </div>
  );
}
