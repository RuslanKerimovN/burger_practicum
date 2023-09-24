import {BurgerIcon, ListIcon, ProfileIcon, Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import styleHeader from './app-header.module.css';
import { HeaderItem } from '../header-item/header-item';

export const AppHeader = () => {
    return (
        <header>
            <nav className={`p-4 ${styleHeader.header}`}>
                <div className={styleHeader.items}>
                    {/* <a href='#'> */}
                        <HeaderItem styleItem={'text text_type_main-default'} text={'Конструктор'}>
                            <BurgerIcon type='primary' />
                        </HeaderItem>
                    {/* </a> */}
                    {/* <a href='#'> */}
                        <HeaderItem styleItem={'text text_type_main-default text_color_inactive'} text={'Лента заказов'}>
                            <ListIcon type='secondary' />
                        </HeaderItem>
                    {/* </a> */}
                </div>
                <div className={styleHeader.items}>
                    <Logo/>
                </div>
                {/* <a href='#'> */}
                <div className={styleHeader.items}>
                    <HeaderItem styleItem={'text text_type_main-default text_color_inactive'} text={'Личный кабинет'}>
                        <ProfileIcon type='secondary' />
                    </HeaderItem>
                </div>
                {/* </a> */}
            </nav>
        </header>
    );
}
