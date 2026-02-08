import { useDispatch } from 'react-redux';
import { qrcodeReaderActions } from '../../state/reducers/qrcode-reader-reducer';
import QRCodeScanner from '../components/qrcode-scanner';
import Modal from './modal';

export default function QRCodeReader({
  onClose,
  title,
}: {
  onClose: (qrCoder: string) => void;
  title?: string;
}) {
  const dispatch = useDispatch();

  return (
    <Modal
      className='qrcode-reader-modal'
      onClose={() => dispatch(qrcodeReaderActions.setShowModal(false))}>
      <div className='qrcode-reader-modal-body'>
        <QRCodeScanner
          title={title}
          onClose={(qr) => {
            onClose(qr);
            dispatch(qrcodeReaderActions.setShowModal(false));
          }}
        />
      </div>
    </Modal>
  );
}
