import { useDispatch } from 'react-redux';
import { scannerActions } from '../../state/reducers/scanner-reducer';
import StubViewerMainDisplay from './stub-viewer-main-display';
export default function StubViewer() {
  const dispatch = useDispatch();
  function onContinue() {
    dispatch(scannerActions.setScreen(1));
  }
  return (
    <>
      <StubViewerMainDisplay />
      <button className='btn color-green' onClick={onContinue}>
        Continue
      </button>
    </>
  );
}
