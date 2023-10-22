import styles from './forgot-password-page.module.css';
import { HEIGHT_WITHOUT_HEADER } from '../../constants/constants';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import { LOGIN, RESET_PASSWORD } from '../../constants/path';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
    getStateConfirmationEmail,
    getStateConfirmationEmailError,
    getStateConfirmationEmailLoading,
    postConfirmationEmail
} from '../../services/slices/confirmationEmailSlice';
import { useInput } from '../../hooks/useInput';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { ModalStatus } from '../../components/modal-status/modal-status';
import { useModal } from '../../hooks/useModal';
import { useEffect } from 'react';
import { Status } from '../../components/status/status';

export const ForgotPasswordPage = () => {
    const dispatch = useAppDispatch();
    const confirmationEmail = useAppSelector(getStateConfirmationEmail);
    const isLoadingConfirmationEmail = useAppSelector(getStateConfirmationEmailLoading);
    const isErrorConfirmationEmail = useAppSelector(getStateConfirmationEmailError);
    const [email, setEmail] = useInput();
    const {isModalOpen, closeModal, openModal} = useModal();

    const onRecoveryClick = () => {
        dispatch(postConfirmationEmail(email));
    }

    useEffect(() => {
        if (isErrorConfirmationEmail) {
            openModal();
        }
    }, [isErrorConfirmationEmail])

    return (
        <>
            {(isLoadingConfirmationEmail)
                ?   <Status status='Проверка данных...'/>
                :   (!confirmationEmail.success) ?
                        <div className={`${styles.login}`} style={{height: HEIGHT_WITHOUT_HEADER}}>
                            <p className={`text text_type_main-medium mb-6`}>
                                Восстановление пароля
                            </p>
                            <div className='mb-6'>
                                <Input placeholder='E-mail' value={`${email}`} onChange={setEmail}/>
                            </div>
                            <div className='mb-20'>
                                <Button htmlType="button" type="primary" size="medium" onClick={onRecoveryClick}>
                                    Восстановить
                            </Button>
                            </div>
                            <p className={`text text_type_main-default text_color_inactive`}>
                                Уже зарегистрированы? <Link to={LOGIN} className={`${styles.text}`}>Войти</Link>
                            </p>
                        </div>
                    :   <Navigate to={RESET_PASSWORD}/>
            }
            {isModalOpen &&
                <ModalStatus
                    header='Данный пользователь не зарегистрирован, попробуйте ввести правильный e-mail'
                    closeModal={closeModal}
                />
            }
        </>
    )
};