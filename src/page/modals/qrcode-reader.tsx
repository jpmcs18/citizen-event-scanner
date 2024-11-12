import { QrScanner } from '@yudiel/react-qr-scanner';
import { useDispatch } from 'react-redux';
import Modal from './modal';
import { qrcodeReaderActions } from '../../state/reducers/qrcode-reader-reducer';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import Scanner from '../components/scanner';

export default function QRCodeReader({
  onClose,
  title,
}: {
  onClose: (qrCoder: string) => void;
  title?: string;
}) {
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  return (
    <Modal
      className='qrcode-reader-modal'
      onClose={() => dispatch(qrcodeReaderActions.setShowModal(false))}>
      <div className='qrcode-reader-modal-body'>
        {userProfileState.isScanner ? (
          <div className='mobile-scanner'>
            <QrScanner
              onDecode={(result) => {
                onClose(result);
                dispatch(qrcodeReaderActions.setShowModal(false));
              }}
              onError={() => {}}
            />
          </div>
        ) : (
          <Scanner
            onRead={(result) => {
              onClose(result);
              dispatch(qrcodeReaderActions.setShowModal(false));
            }}
          />
        )}
        {userProfileState.isScanner && (
          <h2 className='qrcode-reader-sub-title'>
            Place QR Code within the box
          </h2>
        )}
        <h2 className='qrcode-reader-sub-title bold text-red'>{title}</h2>
      </div>
    </Modal>
  );
}
