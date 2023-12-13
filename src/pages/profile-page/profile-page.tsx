import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants/constants';
import styles from './profile-page.module.css';
import {  useState, useEffect } from 'react';
import { NavLink, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { LOGIN, PROFILE, PROFILE_ORDERS } from '../../constants/path';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { postLogout } from '../../services/slices/logoutSlice/logoutSlice.ts';
import { useAppSelector } from '../../hooks/useAppSelector';
import { deleteUser, getUser } from '../../services/slices/userSlice/userSlice.ts';
import { deleteCookie } from '../../helpers/helpers';
import { clearLogin } from '../../services/slices/loginSlice/loginSlice.ts';
import { getStateName } from '../../services/slices/userSlice/userSelector.ts';

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const name = useAppSelector(getStateName);
  const [token, setToken] = useState<string>('');
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const tokenCheck = localStorage.getItem(REFRESH_TOKEN);
    if (tokenCheck) setToken(tokenCheck);

    if (!name && tokenCheck) {
      dispatch(getUser());
    }
  }, [name, dispatch]);

  const onLogoutClick = async () => {
    await dispatch(postLogout(token));
    localStorage.getItem(REFRESH_TOKEN);
    deleteCookie(ACCESS_TOKEN);
    dispatch(deleteUser());
    dispatch(clearLogin());
    navigate(LOGIN);
  };

  return (
    <>
      <div className={`${styles.page}`}>
        <div className={`${styles.items} mr-15 mt-30`}>
          <div className={`${styles.nav}`}>
            <NavLink
              to={PROFILE}
              className={pathname === PROFILE
                ? `text text_type_main-medium ${styles.active}`
                : `text text_type_main-medium ${styles.notActive}`}
            >
              Профиль
            </NavLink>
          </div>
          <div className={`${styles.nav}`}>
            <NavLink
              to={PROFILE_ORDERS}
              className={pathname === `${PROFILE}/${PROFILE_ORDERS}`
                ? `text text_type_main-medium ${styles.active}`
                : `text text_type_main-medium ${styles.notActive}`}
            >
              История заказов
            </NavLink>
          </div>
          <div className={`${styles.nav} mb-20`}>
            <NavLink
              to={LOGIN}
              className={({ isActive }) =>  isActive
                ? `text text_type_main-medium ${styles.active}`
                : `text text_type_main-medium ${styles.notActive}`}
              onClick={onLogoutClick}
            >
              Выход
            </NavLink>
          </div>
          <div className={`${styles.nav}`}>
            <p className='text text_type_main-default text_color_inactive'>
              {
                pathname === PROFILE
                  ? 'В этом разделе вы можете изменить свои персональные данные'
                  : 'В этом разделе вы можете посмотреть свою историю заказов'
              }
            </p>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};
