import {
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { toMMMdd_hhtt } from '../../helper';
import { RootState } from '../../state/store';

export default function StubConfirmation() {
  const stubState = useSelector((state: RootState) => state.stub);
  // const dispatch = useDispatch();
  // const setBusy = useSetBusy();
  // async function onContinue() {
  //   setBusy(true);
  //   await claimStub(stubState.stub?.id!, stubState.stub?.logCount!)
  //     .then((res) => {
  //       if (res) {
  //         dispatch(stubActions.setStub());
  //         dispatch(scannerActions.setScreen(12));
  //       }
  //     })
  //     .catch((err) => {
  //       dispatch(stubActions.setStub());
  //       dispatch(scannerActions.setError(err.message));
  //       dispatch(scannerActions.setScreen(8));
  //     })
  //     .finally(() => setBusy(false));
  // }
  // function cancel() {
  //   dispatch(stubActions.setStub(undefined));
  //   dispatch(scannerActions.setScreen(1));
  // }
  return (
    <div className='container stub-container'>
      <div className='name bold'>{stubState.stub?.logCount}</div>
      <div className='name bold'>{stubState.stub?.eventName} STUB</div>
      <div className='name'>{stubState.stub?.personName}</div>
      {stubState.stub?.representedBy && (
        <>
          <div>Represented By</div>
          <div className='name'>{stubState.stub?.scannedBy}</div>
        </>
      )}
      {stubState.stub?.isClaimed ? (
        <p className='caption text-red '>
          <FontAwesomeIcon className='text-icon' icon={faTimesCircle} />
          &nbsp;
          <span>ALREADY SCANNED</span>
        </p>
      ) : (
        <p className='caption text-green '>
          <FontAwesomeIcon className='text-icon' icon={faCheckCircle} />
          &nbsp;
          <span>SCANNED</span>
        </p>
      )}
      <img
        className='image'
        src={stubState.stub?.familyMemberSelfieBase64}
        alt='Claim Scanned'
      />
      <div>Scanned By</div>
      <div className='name'>{stubState.stub?.scannedBy}</div>
      <div>Scanned On</div>
      <div className='name'>{toMMMdd_hhtt(stubState.stub?.scannedOn)}</div>
      {stubState.stub?.isClaimed ? (
        <>
          <div>Stub Scanned By</div>
          <div className='name'>{stubState.stub?.stubScannedBy}</div>
          <div>Stub Scanned On</div>
          <div className='name'>
            {toMMMdd_hhtt(stubState.stub?.stubScannedOn)}
          </div>
        </>
      ) : (
        // <button className='btn color-green' onClick={onContinue}>
        //   Claim
        // </button>
        <></>
      )}
      {/* <button className='btn btn-cancel' onClick={cancel}>
        Cancel
      </button> */}
    </div>
  );
}
