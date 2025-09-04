import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Webcam from 'react-webcam';
import { resizeBase64Image } from '../../helper';
import { scannerActions } from '../../state/reducers/scanner-reducer';
import { RootState } from '../../state/store';
import { saveAttendance } from '../../repositories/event-attendance-queries';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';

export default function CapturePhoto() {
  const scannerState = useSelector((state: RootState) => state.scanner);
  const dispatch = useDispatch();
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const webcamRef = useRef<Webcam | null>(null);
  // useEffect(
  //   () => {
  //     trySave();
  //   },
  //   //eslint-disable-next-line
  //   []
  // );
  // async function trySave() {
  //   if (scannerState.isAttendance) {
  //     if (scannerState.isAttendance) {
  //       setBusy(true);
  //       await saveAttendance(
  //         scannerState.person?.id ?? 0,
  //         userProfileState.event?.id ?? 0,
  //         scannerState.photo ?? '',
  //         scannerState.approvedId,
  //         scannerState.hasRepresentative
  //           ? scannerState.representative?.id
  //           : undefined,
  //         scannerState.officeId,
  //         scannerState.purpose
  //       )
  //         .then((res) => {
  //           if (res) {
  //             dispatch(scannerActions.setScreen(7));
  //           } else {
  //             setToasterMessage({ content: 'Unable to save attendance' });
  //             if (scannerState.hasRepresentative) {
  //               dispatch(scannerActions.setScreen(5));
  //             } else {
  //               dispatch(scannerActions.setScreen(2));
  //             }
  //           }
  //         })
  //         .catch((err) => setToasterMessage({ content: err.message }))
  //         .finally(() => setBusy(false));
  //     }
  //   }
  // }
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
  function confirm() {
    dispatch(scannerActions.setScreen(9));
  }
  return (
    <div className='container'>
      {/* {scannerState.isAttendance ? (
        <p>Saving...</p>
      ) : (
        <> */}
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
      {/* </>
      )} */}
    </div>
  );
}
