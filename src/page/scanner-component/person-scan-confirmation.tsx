import {
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { offices } from '../../constant';
import { useSetBusy } from '../../custom-hooks/authorize-provider';
import { toDateMMM_dd_yyyy, toMMMdd_hhtt } from '../../helper';
import errorLogo from '../../icons/error_.png';
import { printStub } from '../../repositories/event-queries';
import { scannerActions } from '../../state/reducers/scanner-reducer';
import { stubViewerActions } from '../../state/reducers/stub-viewer-reducer';
import { RootState } from '../../state/store';
import CustomDropdown from '../components/custom-dropdown';
import CustomTextArea from '../components/custom-textarea';
import StubViewerModal from '../modals/stub-viewer-modal';
export default function PersonScanConfirmation() {
  const stubViewerState = useSelector((state: RootState) => state.stubViewer);
  const scannerState = useSelector((state: RootState) => state.scanner);
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
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
  async function printClaimStub() {
    setBusy(true);
    await printStub(scannerState.person?.eventClaimId ?? 0)
      .then((res) => {
        dispatch(stubViewerActions.setStub(res));
        dispatch(stubViewerActions.setAutoPrint(true));
        dispatch(stubViewerActions.setShowModal(true));
      })
      .catch((err) => {
        dispatch(scannerActions.setError(err.message));
        dispatch(scannerActions.setScreen(8));
      })
      .finally(() => setBusy(false));
  }
  return (
    <div className='container'>
      <div className='name'>{scannerState.person?.fullName}</div>
      {scannerState.isAttendance && (
        <div
          className={
            'name ' + (scannerState.person?.hasIn ? 'text-red' : 'text-green')
          }>
          {scannerState.person?.hasIn ? 'OUT' : 'IN'}
        </div>
      )}
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
      {scannerState.isClaim && scannerState.person?.isClaimScanned ? (
        <img
          className='image'
          src={scannerState.person?.familyMemberSelfieBase64}
          alt='Claim Scanned'
        />
      ) : (
        <img
          className='image'
          src={scannerState.person?.selfieBase64}
          alt={scannerState.person?.fullName}
        />
      )}
      {scannerState.isAttendance &&
        !scannerState.person?.isAttendanceScanned && (
          <>
            <CustomDropdown
              title='Target Office'
              itemsList={offices.map((x) => {
                return {
                  key: x.id.toString(),
                  value: x.description,
                };
              })}
              value={scannerState.officeId}
              onChange={(x) => dispatch(scannerActions.setOffice(x.value))}
            />
            <CustomTextArea
              lines={3}
              title='Purpose'
              value={scannerState.purpose}
              onChange={(x) => dispatch(scannerActions.setPurpose(x.value))}
            />
          </>
        )}
      {userProfileState.event?.isTargetIndividualBenefeciaries
        ? !scannerState.person?.isInTheList &&
          userProfileState.event?.scanningTypeId !== 3 &&
          !userProfileState.event?.checkAppointment &&
          userProfileState.event?.checkAppointment && (
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
      {scannerState.isClaim && scannerState.person?.isClaimScanned ? (
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
              </div>
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
              <span>ALREADY CLAIMED</span>
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
      {userProfileState.systemUser?.allowReprintStub &&
        scannerState.isClaim &&
        scannerState.person?.isClaimScanned && (
          <button className='btn color-green' onClick={printClaimStub}>
            Reprint Stub
          </button>
        )}
      <button className='btn btn-cancel' onClick={cancel}>
        Cancel
      </button>
      <>{stubViewerState.isModalShow && <StubViewerModal />}</>
    </div>
  );
}
