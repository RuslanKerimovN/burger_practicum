import {BurgerIcon, ListIcon, ProfileIcon, Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { HeaderItem } from '../header-item/header-item';
import { NavLink, useLocation } from 'react-router-dom';
import { HOME, PROFILE, PROFILE_TAPE } from '../../constants/path';
import { getIconType } from '../../helpers/helpers';

export const AppHeader = () => {
    const {pathname} = useLocation();

    return (
        <header className={`${styles.headerStyle}`}>
            <nav className={`p-4 ${styles.header}`}>
                <div className={`${styles.items}`}>
                    <NavLink
                        to={HOME}
                        className={({ isActive }) =>  isActive ? `${styles.active}` : `${styles.notActive}`}
                    >
                        <HeaderItem text={'Конструктор'}>
                            <BurgerIcon type={getIconType(pathname, 'constructor')}/>
                        </HeaderItem>
                    </NavLink>
                    <NavLink
                        to={PROFILE_TAPE}
                        className={({ isActive }) =>  isActive ? `${styles.active}` : `${styles.notActive}`}
                    >
                        <HeaderItem text={'Лента заказов'}>
                            <ListIcon type={getIconType(pathname, 'tape')}/>
                        </HeaderItem>
                    </NavLink>
                </div>
                <div className={`${styles.items}`}>
                    <Logo/>
                </div>
                <NavLink
                    to={PROFILE}
                    className={({ isActive }) =>  isActive ? `${styles.active}` : `${styles.notActive}`}
                >
                    <div className={`${styles.items}`}>
                        <HeaderItem text={'Личный кабинет'}>
                            <ProfileIcon type={getIconType(pathname, 'profile')}/>
                        </HeaderItem>
                    </div>
                </NavLink>
            </nav>
        </header>
    );
}
