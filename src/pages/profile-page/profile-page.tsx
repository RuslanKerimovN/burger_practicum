import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { ACCESS_TOKEN, HEIGHT_WITHOUT_HEADER, REFRESH_TOKEN } from '../../constants/constants';
import styles from './profile-page.module.css';
import { ChangeEvent, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LOGIN, PROFILE, PROFILE_ORDERS } from '../../constants/path';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { postLogout } from '../../services/slices/logoutSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { deleteUser, getStateIsChangeData, getStateName, getStateUserEmail, getStateUserName, getStateUserPassword, getUser, patchUser, resetChanges, setUserEmail, setUserName, setUserPassword } from '../../services/slices/userSlice';
import { deleteCookie } from '../../helpers/helpers';
import { clearLogin, setLoginName } from '../../services/slices/loginSlice';

export const ProfilePage = () => {
    const dispatch = useAppDispatch();
    const userEmail =  useAppSelector(getStateUserEmail);
    const userName = useAppSelector(getStateUserName);
    const userPassword = useAppSelector(getStateUserPassword);
    const isChangeData = useAppSelector(getStateIsChangeData);
    const name = useAppSelector(getStateName);
    const [token, setToken] = useState<string>('');
    const navigate = useNavigate();

    const onChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
        if (name === 'name') {
            dispatch(setUserName(e.target.value))
        } else if (name === 'email') {
            dispatch(setUserEmail(e.target.value))
        } else {
            dispatch(setUserPassword(e.target.value));
        }
    }

    useEffect(() => {
        const token = localStorage.getItem(REFRESH_TOKEN); 
        if (token) setToken(token);
        
        if (!name && token) {
            dispatch(getUser())
        }
    }, [name]);

    useEffect(() => {
        dispatch(setLoginName(name));
    }, [name]);

    const onLogoutClick = async () => {
        await dispatch(postLogout(token));
        localStorage.getItem(REFRESH_TOKEN);
        deleteCookie(ACCESS_TOKEN);
        dispatch(deleteUser());
        dispatch(clearLogin());
        navigate(LOGIN);
    }

    return (
        <>
            <div className={`${styles.page}`}>
                <div className={`${styles.items} mr-15 mt-30`}>
                    <div className={`${styles.nav}`}>
                        <NavLink to={PROFILE} className={({ isActive }) =>  isActive ? `text text_type_main-medium ${styles.active}` : `text text_type_main-medium ${styles.notActive}`}>
                            Профиль
                        </NavLink>
                    </div>
                    <div className={`${styles.nav}`}>
                        <NavLink to={PROFILE_ORDERS} className={({ isActive }) =>  isActive ? `text text_type_main-medium ${styles.active}` : `text text_type_main-medium ${styles.notActive}`}>
                            История заказов
                        </NavLink>
                    </div>
                    <div className={`${styles.nav} mb-20`}>
                        <NavLink
                            to={LOGIN}
                            className={({ isActive }) =>  isActive ? `text text_type_main-medium ${styles.active}` : `text text_type_main-medium ${styles.notActive}`}
                            onClick={onLogoutClick}
                        >
                            Выход
                        </NavLink>
                    </div>
                    <div className={`${styles.nav}`}>
                        <p className="text text_type_main-default text_color_inactive">
                            В этом разделе вы можете изменить свои персональные данные
                        </p>
                    </div>
                </div>
                <div
                    className={`${styles.items} mt-30`}
                    style={{height: HEIGHT_WITHOUT_HEADER}}
                >
                    <div className='mb-6'>
                        <Input placeholder='Имя' value={userName} onChange={(e) => onChange(e, 'name')} icon={'EditIcon'}/>
                    </div>
                    <div className='mb-6'>
                        <Input placeholder='Логин' value={userEmail} onChange={(e) => onChange(e, 'email')} icon={'EditIcon'}/>
                    </div>
                    <div className='mb-6'>
                        <Input placeholder='Пароль' value={userPassword} onChange={(e) => onChange(e, 'password')} icon={'EditIcon'}/>
                    </div>
                    {isChangeData ? 
                            <div>
                                <div className={`${styles.buttons}`}>
                                    <Button
                                        htmlType='button'
                                        type='secondary'
                                        onClick={() => dispatch(patchUser({name: userName, email: userEmail, password: userPassword}))}
                                    >
                                        Сохранить
                                    </Button>
                                    <Button htmlType='button' onClick={() => dispatch(resetChanges())}>
                                        Отменить
                                    </Button>
                                </div>
                            </div>
                        :   <></>
                    }
                </div>
            </div>
        </>
    );
}
