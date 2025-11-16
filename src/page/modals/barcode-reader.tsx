import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { toMMMdd_at_hhmm_tt } from '../../helper';
import { scanStubQRCode } from '../../repositories/stub-queries';
import { barcodeReaderActions } from '../../state/reducers/barcode-reader-reducer';
import { stubActions } from '../../state/reducers/stub-reducer';
import { userProfileActions } from '../../state/reducers/user-profile-reducer';
import { RootState } from '../../state/store';
import BarcodeScanner from '../components/barcode-scanner';
import Modal from './modal';

export default function BarcodeReader({ title }: { title?: string }) {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const stubState = useSelector((state: RootState) => state.stub);
  async function onStubRead(code: string) {
    setBusy(true);
    await scanStubQRCode(code)
      .then(async (res) => {
        if (res) {
          dispatch(stubActions.setStub(res));
          if (!res.isClaimed) {
            dispatch(
              userProfileActions.setScannerLogCount(
                userProfileState.scannerLogCount + 1
              )
            );
          }
        } else {
          setToasterMessage({ content: 'Invalid Stub' });
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }

  return (
    <Modal
      title={`TOTAL STUB SCANNED: ${userProfileState.scannerLogCount}`}
      className='barcode-reader-modal'
      onClose={() => dispatch(barcodeReaderActions.setShowModal(false))}>
      <div className='barcode-reader-modal-body'>
        <div className='scanner'>
          <div className='qrcode-reader-sub-title'>
            {userProfileState.event?.description} STUB
          </div>
          <div className='qrcode-reader-sub-title'>
            {stubState.stub?.personName}
          </div>
          {stubState.stub?.representedBy && (
            <>
              <div>Represented By</div>
              <div className='name'>{stubState.stub?.scannedBy}</div>
            </>
          )}
          {stubState.stub?.isClaimed ? (
            <div className='status bg-red qrcode-reader-sub-title'>
              ALREADY SCANNED
            </div>
          ) : (
            <div className='status bg-green qrcode-reader-sub-title'>
              SCANNED
            </div>
          )}
          <img
            className='image'
            src={stubState.stub?.familyMemberSelfieBase64}
            alt='Claim Scanned'
          />
          {stubState.stub && (
            <>
              <div className='text'>
                Printed by:&nbsp;
                <span className='text-red'>{stubState.stub?.scannedBy}</span>
              </div>
              <div className='text'>
                Printed on:&nbsp;
                <span className='text-red'>
                  {toMMMdd_at_hhmm_tt(stubState.stub?.scannedOn)}
                </span>
              </div>
            </>
          )}
          {stubState.stub?.isClaimed && (
            <>
              <div className='text'>
                Scanned by:&nbsp;
                <span className='text-red'>
                  {stubState.stub?.stubScannedBy}
                </span>
              </div>
              <div className='text'>
                Scanned on:&nbsp;
                <span className='text-red'>
                  {toMMMdd_at_hhmm_tt(stubState.stub?.stubScannedOn)}
                </span>
              </div>
            </>
          )}
          <BarcodeScanner
            onRead={(result) => {
              onStubRead(result);
            }}
          />
        </div>
        {/* <div className='main-body-container'>
          <div className='body-content'>
            <StubConfirmation />
          </div>
        </div> */}
      </div>
    </Modal>
  );
}
