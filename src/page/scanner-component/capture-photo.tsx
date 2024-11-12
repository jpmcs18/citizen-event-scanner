import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Webcam from 'react-webcam';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { resizeBase64Image } from '../../helper';
import { saveAttendance } from '../../repositories/event-attendance-queries';
import { saveClaim } from '../../repositories/event-claim-queries';
import { scannerActions } from '../../state/reducers/scanner-reducer';
import { RootState } from '../../state/store';

export default function CapturePhoto() {
  const scannerState = useSelector((state: RootState) => state.scanner);
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const webcamRef = useRef<Webcam | null>(null);
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      trySave();
    },
    //eslint-disable-next-line
    []
  );
  async function trySave() {
    if (scannerState.isAttendance) {
      await confirm();
    }
  }
  async function capture() {
    const imageSrc = webcamRef.current?.getScreenshot();
    const image = await resizeBase64Image(imageSrc!, 480, 480);
    dispatch(scannerActions.setPhoto(image));
  }
  function reCapture() {
    dispatch(scannerActions.setPhoto(undefined));
  }
  function cancel() {
    dispatch(scannerActions.setScreen(1));
  }
  async function confirm() {
    setBusy(true);
    if (scannerState.isAttendance) {
      await saveAttendance(
        scannerState.person?.id ?? 0,
        userProfileState.event?.id ?? 0,
        scannerState.photo ?? '',
        scannerState.approvedId,
        scannerState.hasRepresentative
          ? scannerState.representative?.id
          : undefined
      )
        .then((res) => {
          if (res) {
            dispatch(scannerActions.setScreen(7));
          } else {
            setToasterMessage({ content: 'Unable to save attendance' });
          }
        })
        .catch((err) => setToasterMessage({ content: err.message }))
        .finally(() => setBusy(false));
    }

    if (scannerState.isClaim) {
      await saveClaim(
        scannerState.person?.id ?? 0,
        userProfileState.event?.id ?? 0,
        scannerState.photo ?? '',
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
    <>
      {scannerState.isAttendance ? (
        <p>Saving...</p>
      ) : (
        <>
          <div className='selfie-container'>
            {scannerState.photo ? (
              <img className='image' src={scannerState.photo} alt='Capture' />
            ) : (
              <Webcam
                className='webcam'
                audio={false}
                ref={webcamRef}
                screenshotFormat='image/png'
                width={500}
                videoConstraints={{
                  height: 480,
                  width: 480,
                  aspectRatio: 1,
                  facingMode: 'environment',
                }}
              />
            )}
          </div>
          {scannerState.photo ? (
            <>
              <button className='btn color-blue' onClick={reCapture}>
                Recapture
              </button>
              <button className='btn color-green' onClick={confirm}>
                Confirm
              </button>
            </>
          ) : (
            <button className='btn color-green' onClick={capture}>
              Capture
            </button>
          )}
          <button className='btn btn-cancel' onClick={cancel}>
            Cancel
          </button>
        </>
      )}
    </>
  );
}
