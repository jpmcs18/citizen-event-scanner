import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SystemModules } from '../routes';
import { RootState } from '../state/store';
import Approval from './scanner-component/approval';
import CapturePhoto from './scanner-component/capture-photo';
import ErrorScan from './scanner-component/error-scan';
import PersonScanConfirmation from './scanner-component/person-scan-confirmation';
import RepresentativeConfirmation from './scanner-component/representative-confirmation';
import RepresentativeDisplay from './scanner-component/representative-display';
import ScannerMainDisplay from './scanner-component/scanner-main-display';
import SuccessScan from './scanner-component/success-scan';
import CaptureSignature from './scanner-component/capture-signature';

export default function ScannerPage() {
  const scannerState = useSelector((state: RootState) => state.scanner);
  const userProfileState = useSelector((state: RootState) => state.userProfile);

  useEffect(
    () => {
      if (!userProfileState.event) {
        window.location.href = SystemModules.Home;
      }
    },
    //eslint-disable-next-line
    []
  );
  return (
    <div className='body-content'>
      {scannerState.screen === 1 && <ScannerMainDisplay />}
      {scannerState.screen === 2 && <PersonScanConfirmation />}
      {scannerState.screen === 3 && <Approval />}
      {scannerState.screen === 4 && <RepresentativeDisplay />}
      {scannerState.screen === 5 && <RepresentativeConfirmation />}
      {scannerState.screen === 6 && <CapturePhoto />}
      {scannerState.screen === 7 && <SuccessScan />}
      {scannerState.screen === 8 && <ErrorScan />}
      {scannerState.screen === 9 && <CaptureSignature />}
      {/* {scannerState.screen === 8 && <NoAppointmentError />}
      {scannerState.screen === 9 && <UnconfirmedFamilyError />}
      {scannerState.screen === 10 && <BarangayNotScheduled />} */}
    </div>
  );
}
