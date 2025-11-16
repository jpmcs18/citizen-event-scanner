import { QrScanner } from '@yudiel/react-qr-scanner';
import { useDispatch } from 'react-redux';
import Modal from './modal';
import { qrcodeReaderActions } from '../../state/reducers/qrcode-reader-reducer';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import Scanner from '../components/scanner';
import jsQR from 'jsqr-es6';

export default function QRCodeReader({
  onClose,
  title,
}: {
  onClose: (qrCoder: string) => void;
  title?: string;
}) {
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          if (context) {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);
            const imageData = context.getImageData(0, 0, img.width, img.height);
            const qrCode = jsQR(imageData.data, img.width, img.height);

            if (qrCode) {
              onClose(qrCode.data);
              dispatch(qrcodeReaderActions.setShowModal(false));
            }
          }
        };
        if (e.target?.result) {
          img.src = e.target.result as string;
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const upload = () => {
    document.getElementById('uploadqr')?.click();
  };
  return (
    <Modal
      className='qrcode-reader-modal'
      onClose={() => dispatch(qrcodeReaderActions.setShowModal(false))}>
      <div className='qrcode-reader-modal-body'>
        {userProfileState.isScanner ? (
          <>
            <div className='mobile-scanner'>
              <QrScanner
                onDecode={(result) => {
                  onClose(result);
                  dispatch(qrcodeReaderActions.setShowModal(false));
                }}
                onError={() => {}}
              />
            </div>

            {userProfileState.isScanner && (
              <h2 className='qrcode-reader-sub-title'>
                Place QR Code within the box
              </h2>
            )}
          </>
        ) : (
          <Scanner
            scannerType='QRCode'
            onRead={(result) => {
              onClose(result);
              dispatch(qrcodeReaderActions.setShowModal(false));
            }}
          />
        )}
        <h2 className='qrcode-reader-sub-title bold text-red'>{title}</h2>

        <input
          hidden
          id='uploadqr'
          type='file'
          accept='image/.jpeg,.png'
          onChange={handleFileUpload}
        />
        <button className='btn btn-red' onClick={upload}>
          Upload QRCode
        </button>
      </div>
    </Modal>
  );
}
