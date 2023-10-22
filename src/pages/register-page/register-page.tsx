import React from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register-page.module.css';
import { HEIGHT_WITHOUT_HEADER } from '../../constants/constants';
import { Link } from 'react-router-dom';
import { LOGIN } from '../../constants/path';

export const RegisterPage = () => {
    return (
        <div
            className={`${styles.login}`}
            style={{height: HEIGHT_WITHOUT_HEADER}}
        >
            <p className={`text text_type_main-medium mb-6`}>
                Регистрация
            </p>
            <div className='mb-6'>
                <Input placeholder='Имя' value='' onChange={() => {}}/>
            </div>
            <div className='mb-6'>
                <Input placeholder='E-mail' value='' onChange={() => {}}/>
            </div>
            <div className='mb-6'>
                <PasswordInput placeholder='Пароль' value='' onChange={() => {}}/>
            </div>
            <div className='mb-20'>
                <Button htmlType="button" type="primary" size="medium" onClick={() => {}}>
                    Зарегистрироваться
                </Button>
            </div>
            <p className={`text text_type_main-default text_color_inactive`}>
                Уже зарегистрированы? <Link to={LOGIN} className={`${styles.text}`}>Войти</Link>
            </p>
        </div>
    );
}
