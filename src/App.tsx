import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthorizeProvider } from './custom-hooks/authorize-provider';
import { refreshTokenAuthentication } from './repositories/base';
import { getTheme, getToken } from './repositories/session-managers';
import { dropdownActions } from './state/reducers/dropdown-reducer';
import { RootState } from './state/store';
import './style/style.css';
import HomePage from './page/home-page';
import { userProfileActions } from './state/reducers/user-profile-reducer';
function App() {
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  useEffect(
    () => {
      if (getTheme()) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }

      if (!userProfileState.authorize) {
        if (getToken() !== undefined) {
          refreshTokenAuthentication();
        }
        dispatch(userProfileActions.initializeState());
      }
      document.removeEventListener('click', () => {});
      document.addEventListener('click', (e: any) => {
        let targetId = e.target.id
          ?.replace('-input', '')
          .replace('-icon', '')
          .replace('-icon-remove', '')
          .replace('-search', '');
        let selection = document.getElementsByClassName('selection');
        for (let i = 0; i < selection.length; i++) {
          if (selection[i].id !== targetId) {
            dispatch(dropdownActions.setOpenDropdown());
          }
        }
      });
    },
    //eslint-disable-next-line
    []
  );
  return (
    <AuthorizeProvider>
      <HomePage />
    </AuthorizeProvider>
  );
}

export default App;
