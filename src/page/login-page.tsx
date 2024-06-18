import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../custom-hooks/authorize-provider';
import logo from '../icons/Main Logo.png';
import { authenticate } from '../repositories/security-queries';
import { getData } from '../repositories/system-user-queries';
import { loginActions } from '../state/reducers/login-reducer';
import { userProfileActions } from '../state/reducers/user-profile-reducer';
import { RootState } from '../state/store';
import CustomPassword from './components/custom-password';
import CustomTextBox from './components/custom-textbox';
import CustomUsername from './components/custom-username';

export default function LoginPage() {
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const loginState = useSelector((state: RootState) => state.login);
  const setToasterMessage = useSetToasterMessage();
  const setBusy = useSetBusy();
  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch(userProfileActions.saveSession());
      dispatch(userProfileActions.initializeState());
    },
    //eslint-disable-next-line
    [userProfileState.systemUser]
  );
  async function signIn() {
    if (loginState.user.username === '') {
      document.getElementById('username')?.focus();
      return;
    }
    if (loginState.user.password === '') {
      document.getElementById('password')?.focus();
      return;
    }
    setBusy(true);
    await authenticate(loginState.user)
      .then(async (res) => {
        if (res) {
          dispatch(loginActions.clear());
          await getProfile();
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  async function getProfile() {
    setBusy(true);
    await getData()
      .then(async (res) => {
        if (res !== undefined) {
          dispatch(userProfileActions.setProfile(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  function onKeyPress(key: React.KeyboardEvent<HTMLDivElement>) {
    if (key.key === 'Enter') {
      if (loginState.user.username === '') {
        document.getElementById('username')?.focus();
        return;
      }
      if (loginState.user.password === '') {
        document.getElementById('password')?.focus();
        return;
      }

      signIn();
    }
  }
  return (
    <section>
      {loginState.screen === 0 && (
        <div className='login-base-container'>
          <div className='logo-side login-container'>
            <div className='icon'>
              <img
                className='navoteno-logo'
                src={logo}
                alt='Navotas Login Logo'
              />
            </div>
          </div>
          <div className='login-side login-container'>
            <div className='header'>
              <h1>System Login</h1>
            </div>
            <div className='login-content'>
              <CustomUsername
                title='USERNAME'
                name='username'
                id='username'
                placeholder='Type your username'
                value={loginState.user.username}
                onChange={(ret) => dispatch(loginActions.setUser(ret))}
                onKeyPress={onKeyPress}
              />
              <CustomPassword
                title='PASSWORD'
                name='password'
                id='password'
                className='password'
                placeholder='Type your password'
                value={loginState.user.password}
                onChange={(ret) => dispatch(loginActions.setUser(ret))}
                onKeyPress={onKeyPress}
              />
              <div className='btn-actions-group'>
                <button onClick={signIn} className='btn-action'>
                  Log In
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
