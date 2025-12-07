import { faHome, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useSetMessage } from '../custom-hooks/authorize-provider';
import { SystemModules } from '../routes';
import { signalRService } from '../services/signalr-service';
import { userProfileActions } from '../state/reducers/user-profile-reducer';
import { RootState } from '../state/store';
import Dashboard from './dashboard';
import LoginPage from './login-page';
import ScannerPage from './scanner-page';
export default function HomePage() {
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const setMessage = useSetMessage();
  const dispatch = useDispatch();
  function logoutUser() {
    setMessage({
      message: 'Continue to logout?',
      action: 'YESNO',
      onOk: async () => {
        await signalRService.unregister(
          userProfileState.systemUser?.id.toString() ?? ''
        );
        dispatch(userProfileActions.clearProfile());
      },
    });
  }
  async function gotoHome() {
    dispatch(userProfileActions.clearEvent());

    await signalRService.unregister(
      userProfileState.systemUser?.id.toString() ?? ''
    );
    window.location.href = SystemModules.Dashboard;
  }
  return (
    <>
      {userProfileState.authorize === undefined ? (
        <div></div>
      ) : userProfileState.authorize ? (
        <div className='main-body-container'>
          {/* <div className='main-header'>
            <div className='main-logo'>
              <img src={logo} alt='Main' />
            </div>
            <div className='main-logo-text'>Event Scanner</div>
          </div> */}
          <BrowserRouter>
            <Routes>
              <Route
                path='*'
                element={<Navigate to={SystemModules.Home} replace />}
              />
              <Route
                path={SystemModules.Home}
                element={<Navigate to={SystemModules.Dashboard} replace />}
              />
              <Route path={SystemModules.Dashboard} element={<Dashboard />} />
              <Route path={SystemModules.Scanner} element={<ScannerPage />} />
            </Routes>
          </BrowserRouter>
          <div className='footer'>
            <div>
              {userProfileState.event && (
                <button
                  className='btn-tool btn-home'
                  onClick={gotoHome}
                  title='Home'>
                  <FontAwesomeIcon icon={faHome} />
                </button>
              )}
            </div>
            <button
              className='btn-tool btn-logout'
              onClick={logoutUser}
              title='Logout'>
              <FontAwesomeIcon icon={faPowerOff} />
            </button>
          </div>
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
}
