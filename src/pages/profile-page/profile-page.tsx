import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { HEIGHT_WITHOUT_HEADER } from '../../constants/constants';
import styles from './profile-page.module.css';
import { ChangeEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';

export const ProfilePage = () => {
    const [state, setState] = useState<string>('');
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        setState(newValue);
    }

    return (
        <div className={`${styles.page}`}>
            <div className={`${styles.items} mr-15 mt-30`}>
                <div className={`${styles.nav}`}>
                    <NavLink to='' className={({ isActive }) =>  isActive ? `text text_type_main-medium ${styles.active}` : ``}>
                        Профиль
                    </NavLink>
                </div>
                <div className={`${styles.nav}`}>
                    <NavLink to='' className={`text text_type_main-medium ${styles.notActive}`}>
                        История заказов
                    </NavLink>
                </div>
                <div className={`${styles.nav} mb-20`}>
                    <NavLink to='/login' className={`text text_type_main-medium ${styles.notActive}`}>
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
                    <Input placeholder='Имя' value='' onChange={() => {}} icon={'EditIcon'}/>
                </div>
                <div className='mb-6'>
                    <Input placeholder='Логин' value='' onChange={() => {}} icon={'EditIcon'}/>
                </div>
                <div className='mb-6'>
                    <PasswordInput placeholder='Пароль' value={state} onChange={onChange} />
                </div>
            </div>
        </div>
    );
}
