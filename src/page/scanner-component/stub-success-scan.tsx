import { useDispatch } from 'react-redux';
import approveLogo from '../../icons/success_icon.png';
import { scannerActions } from '../../state/reducers/scanner-reducer';

export default function StubSucessScan() {
  const dispatch = useDispatch();
  function onContinue() {
    dispatch(scannerActions.setScreen(1));
  }
  return (
    <div className='success-scan'>
      <img src={approveLogo} alt='Approve' />
      <div className='text'>Stub Claim Successfully</div>
      <button className='btn color-green' onClick={onContinue}>
        Continue
      </button>
    </div>
  );
}
