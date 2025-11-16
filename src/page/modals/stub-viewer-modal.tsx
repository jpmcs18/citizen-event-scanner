import { useDispatch } from 'react-redux';
import { stubViewerActions } from '../../state/reducers/stub-viewer-reducer';
import StubViewerMainDisplay from '../scanner-component/stub-viewer-main-display';
import Modal from './modal';
export default function StubViewerModal() {
  const dispatch = useDispatch();

  return (
    <Modal onClose={() => dispatch(stubViewerActions.setShowModal(false))}>
      <div className='modal-content-body qrcode-body'>
        <StubViewerMainDisplay />
      </div>
    </Modal>
  );
}
