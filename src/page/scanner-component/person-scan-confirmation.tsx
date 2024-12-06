import {
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { toDateMMM_dd_yyyy, toMMMdd_hhtt } from '../../helper';
import { scannerActions } from '../../state/reducers/scanner-reducer';
import { RootState } from '../../state/store';
import errorLogo from '../../icons/error_.png';
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
    <div className='container'>
      <div className='name'>{scannerState.person?.fullName}</div>
      <div
        className={
          'name ' +
          (scannerState.person?.verificationStatusId === 2
            ? 'text-green'
            : 'text-red')
        }>
        {scannerState.person?.verificationStatusId === 2
          ? 'VERIFIED'
          : 'UNVERIFIED'}
      </div>
      {scannerState.person?.checkAppointment && (
        <div className='appointment'>
          <div className='description'>
            {scannerState.person?.appointmentType}
          </div>
          <div className='date'>
            <div>APPOINTMENT</div>
            {toMMMdd_hhtt(scannerState.person?.appointmentDate)}
          </div>
        </div>
      )}
      <img
        className='image'
        src={scannerState.person?.selfieBase64}
        alt={scannerState.person?.fullName}
      />
      {userProfileState.event?.isTargetIndividualBenefeciaries
        ? !scannerState.person?.isInTheList &&
          userProfileState.event?.scanningTypeId !== 3 &&
          !scannerState.person?.checkAppointment && (
            <p className='caption text-red'>
              <FontAwesomeIcon icon={faTimesCircle} className='text-icon' />
              <span>NOT IN THE LIST</span>
            </p>
          )
        : scannerState.person?.isHasFamily === false && (
            <p className='caption text-red'>
              <FontAwesomeIcon className='text-icon' icon={faTimesCircle} />
              <span>NOT YET A MEMBER OF A FAMILY</span>
            </p>
          )}
      {(scannerState.isAttendance &&
        scannerState.person?.isAttendanceScanned) ||
      (scannerState.isClaim && scannerState.person?.isClaimScanned) ? (
        <>
          {!userProfileState.event?.isTargetIndividualBenefeciaries ? (
            <>
              <img src={errorLogo} className='error-caption-logo' alt='error' />
              <div className='caption text-red'>
                BENEFITS &nbsp;
                {scannerState.isAttendance ? 'ATTENDED' : 'CLAIMED'}
                &nbsp;BY
              </div>
              <div className='name'>
                {scannerState.isAttendance
                  ? scannerState.person.familyMemberAttendance
                  : scannerState.person.familyMemberClaim}
              </div>{' '}
              <div className='caption text-red'>
                {toDateMMM_dd_yyyy(
                  scannerState.isAttendance
                    ? scannerState.person.attendanceDate
                    : scannerState.person.claimDate
                )}
              </div>
            </>
          ) : (
            <p className='caption text-green'>
              <FontAwesomeIcon className='text-icon' icon={faCheckCircle} />
              <span>
                ALREADY {scannerState.isAttendance ? 'ATTENDED' : 'CLAIMED'}
              </span>
            </p>
          )}
          {(scannerState.person?.claimRepresentative ||
            scannerState.person.attendanceRepresentative) && (
            <>
              <p className='caption text-green'>
                <span>REPRESENTED BY</span>
              </p>
              <p className='caption text-red'>
                <span>
                  {scannerState.isAttendance
                    ? scannerState.person.attendanceRepresentative
                    : scannerState.person?.claimRepresentative}
                </span>
              </p>
            </>
          )}
        </>
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
    </div>
  );
}
