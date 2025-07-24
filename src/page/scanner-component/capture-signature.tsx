import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SignatureCanvas from 'react-signature-canvas';
import Webcam from 'react-webcam';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { saveAttendance } from '../../repositories/event-attendance-queries';
import { saveClaim } from '../../repositories/event-claim-queries';
import { scannerActions } from '../../state/reducers/scanner-reducer';
import { RootState } from '../../state/store';
import { resizeBase64Image } from '../../helper';

export default function CaptureSignature() {
  const scannerState = useSelector((state: RootState) => state.scanner);
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const signRef = useRef<any>(null);

  async function save() {
    if (!signRef.current) return;
    const imageSrc = signRef.current?.toDataURL('image/png', 0.1);
    await confirm(imageSrc);
  }

  function clear() {
    if (signRef.current) signRef.current?.clear();
  }
  function cancel() {
    dispatch(scannerActions.setScreen(1));
  }

  async function confirm(sign: string | undefined) {
    setBusy(true);
    if (scannerState.isClaim) {
      await saveClaim(
        scannerState.person?.id ?? 0,
        userProfileState.event?.id ?? 0,
        scannerState.photo ?? '',
        sign ?? '',
        scannerState.approvedId,
        scannerState.hasRepresentative
          ? scannerState.representative?.id
          : undefined
      )
        .then((res) => {
          if (res) {
            dispatch(scannerActions.setScreen(7));
          } else {
            setToasterMessage({ content: 'Unable to save claim' });
          }
        })
        .catch((err) => setToasterMessage({ content: err.message }))
        .finally(() => setBusy(false));
    }
  }
  return (
    <div className='container'>
      <div className='display-text'>Signature</div>
      <div className='display-text'>
        {scannerState.representative?.fullName ?? scannerState.person?.fullName}
      </div>

      <div className='signature-container'>
        <SignatureCanvas
          penColor='black'
          ref={signRef}
          canvasProps={{ width: 350, height: 200, className: 'sigCanvas' }}
        />
      </div>
      <button className='btn color-green' onClick={save}>
        Continue
      </button>
      <button className='btn color-blue' onClick={clear}>
        Clear
      </button>
      <button className='btn btn-cancel' onClick={cancel}>
        Cancel
      </button>
    </div>
  );
}
