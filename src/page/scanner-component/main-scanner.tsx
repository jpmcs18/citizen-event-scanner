import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SystemModules } from '../../routes';
import { qrcodeReaderActions } from '../../state/reducers/qrcode-reader-reducer';
import { userProfileActions } from '../../state/reducers/user-profile-reducer';
import { RootState } from '../../state/store';
import CustomCheckBoxButton from '../components/custom-checkbox-button';

export default function MainScanner() {
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  function scanQRCode(eventId: number) {
    dispatch(userProfileActions.setEventId(eventId));
    dispatch(qrcodeReaderActions.setShowModal(true));
  }
  useEffect(
    () => {
      if (userProfileState.event) {
        window.location.href = SystemModules.Scanner;
      }
    },
    //eslint-disable-next-line
    []
  );

  return (
    <>
      <div className='main-display-text'>
        Hi {userProfileState.systemUser?.displayName}!
      </div>
      <div className='scanner-type'>
        <CustomCheckBoxButton
          CheckedTitle={'Mobile Scanner'}
          UncheckedTitle={'QR Scanner'}
          isCheck={userProfileState.isScanner}
          onChange={(data) =>
            dispatch(userProfileActions.setIsScanner(!!data.value))
          }
        />
      </div>
      <button className='btn' onClick={() => scanQRCode(0)}>
        Scan the Event QR Code
      </button>
      <button className='btn' onClick={() => scanQRCode(1)}>
        Scan QR Code for Verification
      </button>
      <button className='btn' onClick={() => scanQRCode(2)}>
        Scan QR Code for Attendance
      </button>
    </>
  );
}
