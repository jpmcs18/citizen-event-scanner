import {
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { scannerActions } from '../../state/reducers/scanner-reducer';
import { RootState } from '../../state/store';

export default function PersonScanConfirmation() {
  const scannerState = useSelector((state: RootState) => state.scanner);
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();

  function confirm() {
    if (scannerState.hasRepresentative) dispatch(scannerActions.setScreen(4));
    else dispatch(scannerActions.setScreen(6));
  }
  function approve() {
    dispatch(scannerActions.setScreen(3));
  }
  function cancel() {
    dispatch(scannerActions.setScreen(1));
  }
  return (
    <>
      <div className='name'>{scannerState.person?.fullName}</div>
      <img
        className='image'
        src={scannerState.person?.selfieBase64}
        alt={scannerState.person?.fullName}
      />
      {userProfileState.event?.isTargetIndividualBenefeciaries
        ? !scannerState.person?.isInTheList &&
          userProfileState.event?.scanningTypeId !== 3 && (
            <p className='not-in-list'>
              <FontAwesomeIcon icon={faTimesCircle} /> NOT IN THE LIST
            </p>
          )
        : scannerState.person?.isHasFamily === false && (
            <p className='not-in-list'>
              <FontAwesomeIcon icon={faTimesCircle} /> NOT YET A MEMBER OF A
              FAMILY
            </p>
          )}
      {(scannerState.isAttendance &&
        scannerState.person?.isAttendanceScanned) ||
      (scannerState.isClaim && scannerState.person?.isClaimScanned) ? (
        <p className='not-in-list text-green'>
          {!userProfileState.event?.isTargetIndividualBenefeciaries ? (
            <>
              <div>
                <FontAwesomeIcon icon={faCheckCircle} />
                &nbsp;
                {'BENEFITS HAVE BEEN ' +
                  (scannerState.isAttendance ? 'ATTENDED' : 'CLAIMED') +
                  ' BY '}
              </div>
              <div className='text-red semi-bold  '>
                {scannerState.isAttendance
                  ? scannerState.person.familyMemberAttendance
                  : scannerState.person.familyMemberClaim}
              </div>
            </>
          ) : (
            'ALREADY ' + (scannerState.isAttendance ? 'ATTENDED' : 'CLAIMED')
          )}
        </p>
      ) : !scannerState.person?.isInTheList &&
        userProfileState.event?.scanningTypeId === 2 ? (
        <button className='btn color-green' onClick={approve}>
          Approve
        </button>
      ) : (
        (userProfileState.event?.isTargetIndividualBenefeciaries ||
          scannerState.person?.isHasFamily) && (
          <button className='btn color-green' onClick={confirm}>
            Confirm
          </button>
        )
      )}
      <button className='btn btn-cancel' onClick={cancel}>
        Cancel
      </button>
    </>
  );
}
