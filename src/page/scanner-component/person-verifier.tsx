import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { userProfileActions } from '../../state/reducers/user-profile-reducer';
import { RootState } from '../../state/store';
import { toDateDisplay4 } from '../../helper';
import { qrcodeReaderActions } from '../../state/reducers/qrcode-reader-reducer';

export default function PersonVerifier() {
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();

  function onContinue() {
    dispatch(userProfileActions.setPerson());
    dispatch(userProfileActions.setScreen(1));
  }

  return (
    <>
      {userProfileState.person ? (
        <>
          <FontAwesomeIcon className='icon-success' icon={faCheck} />
          {userProfileState.eventId === 2 && (
            <div className='header'>Welcome!</div>
          )}

          <div className='name text-green'>
            {userProfileState.person?.fullName}
          </div>
          <div
            className={
              'name ' +
              (userProfileState.person?.verificationStatusId === 2
                ? 'text-green'
                : 'text-red')
            }>
            {userProfileState.person?.verificationStatusId === 2
              ? 'VERIFIED'
              : 'UNVERIFIED'}
          </div>

          {userProfileState.eventId === 2 && (
            <div>{toDateDisplay4(new Date())}</div>
          )}
          <img
            className='image'
            src={userProfileState.person?.selfieBase64}
            alt={userProfileState.person?.fullName}
          />
        </>
      ) : (
        <>
          <FontAwesomeIcon className='icon-fail' icon={faTimes} />
          <div className='caption text-red semi-bold'>Invalid QR Code</div>
        </>
      )}

      <button className='btn btn-green' onClick={onContinue}>
        Continue
      </button>
      {userProfileState.eventId === 2 && (
        <button
          className='btn btn-green'
          onClick={() => {
            dispatch(qrcodeReaderActions.setShowModal(true));
          }}>
          Scan QR Code
        </button>
      )}
    </>
  );
}
