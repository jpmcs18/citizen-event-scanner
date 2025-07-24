import { useDispatch, useSelector } from 'react-redux';
import { useSetBusy } from '../../custom-hooks/authorize-provider';
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
          if (res.barangay?.name !== scannerState.person?.barangay) {
            dispatch(
              scannerActions.setError(
                'BENEFICIARY AND REPRESENTATIVE MUST BE IN THE SAME BARANGAY'
              )
            );
            dispatch(qrcodeReaderActions.setShowModal(false));
            dispatch(scannerActions.setScreen(8));
            return;
          }
          console.log(res, scannerState.person);
          if (res.id === scannerState.person?.id) {
            dispatch(
              scannerActions.setError(
                'THE REPRESENTATIVE MUST NOT BE THE BENEFICIARY'
              )
            );
            dispatch(scannerActions.setScreen(8));
          } else {
            dispatch(scannerActions.setRepresentative(res));
            dispatch(scannerActions.setScreen(5));
          }
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
