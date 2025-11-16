import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignatureCanvas from 'react-signature-canvas';
import { useSetBusy } from '../../custom-hooks/authorize-provider';
import { saveClaim } from '../../repositories/event-claim-queries';
import { scannerActions } from '../../state/reducers/scanner-reducer';
import { stubViewerActions } from '../../state/reducers/stub-viewer-reducer';
import { RootState } from '../../state/store';

export default function CaptureSignature() {
  const scannerState = useSelector((state: RootState) => state.scanner);
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
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
            dispatch(stubViewerActions.setStub(res));
            dispatch(scannerActions.setScreen(10));
          } else {
            dispatch(scannerActions.setError('Unable to save claim'));
            dispatch(scannerActions.setScreen(8));
          }
        })
        .catch((err) => {
          dispatch(scannerActions.setError(err.message));
          dispatch(scannerActions.setScreen(8));
        })
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
