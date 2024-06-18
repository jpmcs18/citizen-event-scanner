import React from 'react';
import CustomPassword from '../components/custom-password';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { useDispatch } from 'react-redux';
import { scannerActions } from '../../state/reducers/scanner-reducer';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { validateApprover } from '../../repositories/event-approver-queries';

export default function Approval() {
  const scannerState = useSelector((state: RootState) => state.scanner);
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  async function confirm() {
    setBusy(true);
    await validateApprover(
      scannerState.approverPasscode ?? '',
      userProfileState.event?.id ?? 0
    )
      .then((res) => {
        if (!!res) {
          dispatch(scannerActions.setScreen(4));
          dispatch(scannerActions.setApproverPasscode(undefined));
          dispatch(scannerActions.setApproverId(res));
        } else {
          setToasterMessage({
            content:
              'Passcode is incorrect or Approver is not an Event Approver',
          });
        }
      })
      .catch((err) => setToasterMessage({ content: err.message }))
      .finally(() => setBusy(false));
  }
  function cancel() {
    dispatch(scannerActions.setScreen(1));
  }
  return (
    <>
      <div className='main-display-text'>Input Approver Passcode</div>
      <CustomPassword
        value={scannerState.approverPasscode}
        onChange={(ret) =>
          dispatch(scannerActions.setApproverPasscode(ret.value))
        }
      />

      <button className='btn color-green' onClick={confirm}>
        Confirm
      </button>
      <button className='btn btn-cancel' onClick={cancel}>
        Cancel
      </button>
    </>
  );
}
