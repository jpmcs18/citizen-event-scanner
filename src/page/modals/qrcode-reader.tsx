import { QrScanner } from '@yudiel/react-qr-scanner';
import { useDispatch } from 'react-redux';
import Modal from './modal';
import { qrcodeReaderActions } from '../../state/reducers/qrcode-reader-reducer';

export default function QRCodeReader({
  onClose,
}: {
  onClose: (qrCoder: string) => void;
}) {
  const dispatch = useDispatch();
  return (
    <Modal
      className='qrcode-reader-modal'
      onClose={() => dispatch(qrcodeReaderActions.setShowModal(false))}>
      <QrScanner
        onDecode={(result) => {
          onClose(result);
          dispatch(qrcodeReaderActions.setShowModal(false));
        }}
        onError={() => {}}
      />
      <h2 className='qrcode-reader-sub-title'>Place QR Code within the box</h2>
    </Modal>
  );
}
