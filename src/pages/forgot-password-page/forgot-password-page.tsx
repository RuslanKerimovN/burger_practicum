import styles from './forgot-password-page.module.css';
import { HEIGHT_WITHOUT_HEADER, WIDTH } from '../../constants/constants';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const ForgotPasswordPage = () => {
    return (
        <div
            className={`${styles.login}`}
            style={{width: WIDTH, height: HEIGHT_WITHOUT_HEADER}}
        >
            <p className={`text text_type_main-medium mb-6`}>
                Восстановление пароля
            </p>
            <div className='mb-6'>
                <Input placeholder='E-mail' value='' onChange={() => {}}/>
            </div>
            <div className='mb-20'>
                <Button htmlType="button" type="primary" size="medium" onClick={() => {}}>
                    Восстановить
                </Button>
            </div>
            <p className={`text text_type_main-default text_color_inactive`}>
                Уже зарегистрированы? <Link to={'/login'} className={`${styles.text}`}>Войти</Link>
            </p>
        </div>
    );
}
