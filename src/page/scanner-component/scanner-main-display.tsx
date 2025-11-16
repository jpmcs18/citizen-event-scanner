import { useDispatch, useSelector } from 'react-redux';
import { useSetBusy } from '../../custom-hooks/authorize-provider';
import { validateDate } from '../../helper';
import { scanEventPersonQRCode } from '../../repositories/event-queries';
import { qrcodeReaderActions } from '../../state/reducers/qrcode-reader-reducer';
import { scannerActions } from '../../state/reducers/scanner-reducer';
import { RootState } from '../../state/store';
import QRCodeReader from '../modals/qrcode-reader';
import { userProfileActions } from '../../state/reducers/user-profile-reducer';
import { scanStubQRCode } from '../../repositories/stub-queries';
import { stubActions } from '../../state/reducers/stub-reducer';
import BarcodeReader from '../modals/barcode-reader';
import { barcodeReaderActions } from '../../state/reducers/barcode-reader-reducer';

export default function ScannerMainDisplay() {
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const qrcodeReaderState = useSelector(
    (state: RootState) => state.qrcodeReader
  );
  const barcodeReaderState = useSelector(
    (state: RootState) => state.barcodeReader
  );
  const setBusy = useSetBusy();
  const dispatch = useDispatch();

  function scanAttendance() {
    dispatch(userProfileActions.setIsStubScanner(false));
    dispatch(scannerActions.setActionAsAttendance());
    dispatch(qrcodeReaderActions.setShowModal(true));
    dispatch(scannerActions.setHasRepresentative(false));
  }
  function scanClaim() {
    dispatch(userProfileActions.setIsStubScanner(false));
    dispatch(scannerActions.setActionAsClaim());
    dispatch(qrcodeReaderActions.setShowModal(true));
    dispatch(scannerActions.setHasRepresentative(false));
  }

  function scanAttendanceR() {
    dispatch(userProfileActions.setIsStubScanner(false));
    dispatch(scannerActions.setActionAsAttendance());
    dispatch(scannerActions.setHasRepresentative(true));
    dispatch(qrcodeReaderActions.setShowModal(true));
  }
  function scanClaimR() {
    dispatch(userProfileActions.setIsStubScanner(false));
    dispatch(scannerActions.setActionAsClaim());
    dispatch(qrcodeReaderActions.setShowModal(true));
    dispatch(scannerActions.setHasRepresentative(true));
  }
  function scanStub() {
    dispatch(userProfileActions.setIsStubScanner(true));
    dispatch(barcodeReaderActions.setShowModal(true));
  }
  async function onQRRead(qrCode: string) {
    setBusy(true);
    await scanEventPersonQRCode(qrCode, userProfileState.event?.id ?? 0)
      .then((res) => {
        if (res) {
          if (res.checkAppointment && !validateDate(res.appointmentDate)) {
            dispatch(scannerActions.setError('NO APPOINTMENT FOUND'));
            dispatch(scannerActions.setScreen(8));
            return;
          }
          if (
            !userProfileState.event?.isTargetIndividualBenefeciaries &&
            !res.isFamilyConfirmed
          ) {
            dispatch(scannerActions.setError('FAMILY HAS NOT BEEN APPROVED'));
            dispatch(scannerActions.setScreen(8));
            return;
          }
          if (!res?.isScheduledBarangay) {
            dispatch(scannerActions.setError('BARANGAY IS NOT SCHEDULED'));
            dispatch(scannerActions.setSubError(res.barangay));
            dispatch(scannerActions.setScreen(8));
            return;
          }
          dispatch(scannerActions.setPerson(res));
          dispatch(scannerActions.setScreen(2));
        } else {
          dispatch(scannerActions.setError('INVALID QR CODE'));
          dispatch(scannerActions.setScreen(8));
        }
      })
      .catch((err) => {
        dispatch(scannerActions.setError(err.message));
        dispatch(scannerActions.setScreen(8));
      })
      .finally(() => setBusy(false));
  }
  // async function onStubRead(code: string) {
  //   setBusy(true);
  //   await scanStubQRCode(code)
  //     .then((res) => {
  //       if (res) {
  //         dispatch(stubActions.setStub(res));
  //         dispatch(scannerActions.setScreen(11));
  //       } else {
  //         dispatch(scannerActions.setError('Invalid Stub'));
  //         dispatch(scannerActions.setScreen(8));
  //       }
  //     })
  //     .catch((err) => {
  //       dispatch(scannerActions.setError(err.message));
  //       dispatch(scannerActions.setScreen(8));
  //     })
  //     .finally(() => setBusy(false));
  // }
  return (
    <div className='container'>
      <div className='main-display-text'>
        {userProfileState.event?.description}
      </div>
      {userProfileState.systemUser?.allowScanAttendance &&
        userProfileState.event?.attendanceScan && (
          <>
            <button className='btn color-green' onClick={scanAttendance}>
              Scan QR Code for Attendance
            </button>
            <button className='btn color-green' onClick={scanAttendanceR}>
              Scan QR Code for Representative Attendance
            </button>
          </>
        )}
      {userProfileState.systemUser?.allowScanClaim &&
        userProfileState.event?.claimScan && (
          <>
            <button className='btn' onClick={scanClaim}>
              Scan QR Code for Claiming
            </button>
            {!userProfileState.event?.attendanceScan && (
              <button className='btn' onClick={scanClaimR}>
                Scan QR Code for Representative Claiming
              </button>
            )}
          </>
        )}

      {userProfileState.systemUser?.allowScanStub &&
        userProfileState.event?.claimScan && (
          <button className='btn color-green' onClick={scanStub}>
            Scan Stub for Claiming
          </button>
        )}
      {qrcodeReaderState.isModalShow && (
        <QRCodeReader
          onClose={onQRRead}
          title={
            userProfileState.isStubScanner
              ? 'Scan the QR code on the stub'
              : "Scan the Beneficiary's QR Code"
          }
        />
      )}
      {barcodeReaderState.isModalShow && (
        <BarcodeReader title='Scan Stub Barcode' />
      )}
    </div>
  );
}
