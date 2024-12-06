import React from 'react';
import approveLogo from '../../icons/success_icon.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { useDispatch } from 'react-redux';
import { scannerActions } from '../../state/reducers/scanner-reducer';

export default function SucessScan() {
  const scannerState = useSelector((state: RootState) => state.scanner);
  const dispatch = useDispatch();
  function onContinue() {
    dispatch(scannerActions.setScreen(1));
  }
  return (
    <div className='success-scan'>
      <img src={approveLogo} alt='Approve' />
      <div className='text'>
        {scannerState.isAttendance && <span>Attendance</span>}
        {scannerState.isClaim && <span>Claim</span>}
        <span> Confirmed</span>
      </div>
      <button className='btn color-green' onClick={onContinue}>
        Continue
      </button>
    </div>
  );
}
