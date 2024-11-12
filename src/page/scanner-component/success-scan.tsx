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
    <>
      <div className='main-display-text'>
        <img className='icon-logo' src={approveLogo} alt='Approve' />
        <div>
          {scannerState.isAttendance && (
            <span className='semi-bold'>Attendance</span>
          )}
          {scannerState.isClaim && <span className='semi-bold'>Claim</span>}
          <span className='semi-bold'> Confirmed</span>
        </div>
      </div>
      <button className='btn color-green' onClick={onContinue}>
        Continue
      </button>
    </>
  );
}
