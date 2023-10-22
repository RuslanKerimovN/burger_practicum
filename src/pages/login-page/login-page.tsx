import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login-page.module.css';
import { Link } from 'react-router-dom';
import { HEIGHT_WITHOUT_HEADER } from '../../constants/constants';
import { FORGOT_PASSWORD, REGISTER } from '../../constants/path';

export const LoginPage = () => {
    return (
        <div
            className={`${styles.login}`}
            style={{height: HEIGHT_WITHOUT_HEADER}}
        >
            <p className={`text text_type_main-medium mb-6`}>
                Вход
            </p>
            <div className='mb-6'>
                <Input placeholder='E-mail' value='' onChange={() => {}}/>
            </div>
            <div className='mb-6'>
                <PasswordInput placeholder='Пароль' value='' onChange={() => {}}/>
            </div>
            <div className='mb-20'>
                <Button htmlType="button" type="primary" size="medium" onClick={() => {}}>
                    Войти
                </Button>
            </div>
            <p className={`text text_type_main-default text_color_inactive mb-4`}>
                Вы - новый пользователь? <Link to={REGISTER} className={`${styles.text}`}>Зарегистрироваться</Link>
            </p>
            <p className="text text_type_main-default text_color_inactive">
                Забыли пароль? <Link to={FORGOT_PASSWORD} className={`${styles.text}`}>Восстановить пароль</Link>
            </p>
        </div>
    );
}
