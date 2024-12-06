import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { scanPersonQRCode } from '../../repositories/person-queries';
import { qrcodeReaderActions } from '../../state/reducers/qrcode-reader-reducer';
import { scannerActions } from '../../state/reducers/scanner-reducer';
import { RootState } from '../../state/store';
import QRCodeReader from '../modals/qrcode-reader';

export default function RepresentativeDisplay() {
  const qrcodeReaderState = useSelector(
    (state: RootState) => state.qrcodeReader
  );
  const scannerState = useSelector((state: RootState) => state.scanner);
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const dispatch = useDispatch();
  function scanQR() {
    dispatch(qrcodeReaderActions.setShowModal(true));
  }
  function cancel() {
    dispatch(scannerActions.setScreen(1));
  }
  async function onQRRead(qrCode: string) {
    setBusy(true);
    await scanPersonQRCode(qrCode)
      .then((res) => {
        if (res) {
          if (res.id === scannerState.person?.id) {
            setToasterMessage({
              content: 'The Representative must not be the Beneficiary',
            });
          } else {
            dispatch(scannerActions.setRepresentative(res));
            dispatch(scannerActions.setScreen(5));
          }
        } else {
          setToasterMessage({ content: 'Invalid QR Code' });
        }
      })
      .catch((err) => setToasterMessage({ content: err.message }))
      .finally(() => setBusy(false));
  }
  return (
    <div className='container'>
      <button className='btn color-green' onClick={scanQR}>
        Scan QR Code of Representative
      </button>
      <button className='btn btn-cancel' onClick={cancel}>
        Cancel
      </button>
      {qrcodeReaderState.isModalShow && (
        <QRCodeReader
          onClose={onQRRead}
          title="Scan the Representative's QR Code"
        />
      )}
    </div>
  );
}
