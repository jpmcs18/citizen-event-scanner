import { useDispatch } from 'react-redux';
import {
  useMessage,
  useSetCloseMessageDialog,
} from '../../custom-hooks/authorize-provider';
import { userProfileActions } from '../../state/reducers/user-profile-reducer';
import Modal from './modal';

export default function MessageDialog() {
  const closeDialog = useSetCloseMessageDialog();
  const Message = useMessage();
  const dispatch = useDispatch();

  function handleClose() {
    closeDialog();
  }

  function ok() {
    if (Message?.message === 'Unauthorized') {
      dispatch(userProfileActions.clearProfile());
    }
    closeDialog();
    Message?.onOk?.();
  }
  return (
    <Modal>
      <div className='modal-content-body'>
        <div className='message-body'>{Message?.message}</div>
        {Message?.subMessage && (
          <div className='message-subBody'>{Message?.subMessage}</div>
        )}
      </div>
      <div className='modal-footer'>
        {Message?.action === 'OKCANCEL' && (
          <div className='btn-actions-group'>
            <button onClick={handleClose} className='btn-action btn-secondary '>
              <span className='input-title'>Cancel</span>
              {/* <span className='input-subtitle'>Kanselahin</span> */}
            </button>
          </div>
        )}
        {(Message?.action === undefined || Message?.action === 'OKCANCEL') && (
          <div className='btn-actions-group'>
            <button onClick={ok} className='btn-action btn-primary'>
              <span className='input-title'>Ok</span>
            </button>
          </div>
        )}
        {Message?.action === 'YESNO' && (
          <div className='btn-actions-group'>
            <button onClick={handleClose} className='btn-action btn-secondary'>
              <span className='input-title'>No</span>
              {/* <span className='input-subtitle'>Hindi</span> */}
            </button>
          </div>
        )}
        {Message?.action === 'YESNO' && (
          <div className='btn-actions-group'>
            <button onClick={ok} className='btn-action btn-primary'>
              <span className='input-title'>Yes</span>
              {/* <span className='input-subtitle'>Oo</span> */}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
