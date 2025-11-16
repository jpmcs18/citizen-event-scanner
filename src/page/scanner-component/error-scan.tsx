import React, { useEffect, useState } from 'react';
import errorLogo from '../../icons/error_.png';
import { useDispatch } from 'react-redux';
import { scannerActions } from '../../state/reducers/scanner-reducer';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { userProfileActions } from '../../state/reducers/user-profile-reducer';
export default function ErrorScan() {
  const scannerState = useSelector((state: RootState) => state.scanner);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<string[]>([]);
  useEffect(
    () => {
      if (+scannerState.error.status === 400) {
        Object.keys(scannerState.error.errors).forEach((key) =>
          setErrors((x) => [...x, ...scannerState.error.errors[key]])
        );
      } else {
        if (scannerState.error.message === 'Unauthorized') {
          dispatch(userProfileActions.clearProfile());
        }
        setErrors(() => [scannerState.error?.toString()]);
      }
    },
    //eslint-disable-next-line
    [scannerState.error]
  );
  return (
    <div className='error-scan'>
      <img src={errorLogo} alt='error' />
      <div className='text'>
        {errors.map((x) => (
          <div>{x}</div>
        ))}
      </div>
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
