import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Webcam from 'react-webcam';
import { useSetBusy } from '../../custom-hooks/authorize-provider';
import { resizeBase64Image } from '../../helper';
import { saveAttendance } from '../../repositories/event-attendance-queries';
import { scannerActions } from '../../state/reducers/scanner-reducer';
import { RootState } from '../../state/store';

export default function CapturePhoto() {
  const scannerState = useSelector((state: RootState) => state.scanner);
  const dispatch = useDispatch();
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const setBusy = useSetBusy();
  const webcamRef = useRef<Webcam | null>(null);

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
    if (scannerState.isClaim) {
      dispatch(scannerActions.setScreen(9));
    } else {
      savePersonAttendance();
    }
  }
  async function savePersonAttendance() {
    setBusy(true);
    await saveAttendance(
      scannerState.person?.id ?? 0,
      userProfileState.event?.id ?? 0,
      scannerState.photo ?? '',
      scannerState.approvedId,
      scannerState.hasRepresentative
        ? scannerState.representative?.id
        : undefined,
      scannerState.officeId,
      scannerState.purpose,
      scannerState.person?.hasIn ?? false,
    )
      .then((res) => {
        if (res) {
          dispatch(scannerActions.setScreen(7));
        } else {
          dispatch(scannerActions.setError('Unable to save attendance'));
          dispatch(scannerActions.setScreen(8));
        }
      })
      .catch((err) => {
        dispatch(scannerActions.setError(err.message));
        dispatch(scannerActions.setScreen(8));
      })
      .finally(() => setBusy(false));
  }
  return (
    <div className='container'>
      <div className='selfie-container'>
        <div className='main-display-text'>Capture Photo</div>
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
    </div>
  );
}
