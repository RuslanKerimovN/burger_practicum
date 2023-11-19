import styles from './reset-password-page.module.css';
import { HEIGHT_WITHOUT_HEADER } from '../../constants/constants';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FORGOT_PASSWORD, LOGIN } from '../../constants/path';
import { useInput } from '../../hooks/useInput';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  getStateResetPassword,
  getStateResetPasswordError,
  getStateResetPasswordLoading,
  postResetPassword
} from '../../services/slices/resetPasswordSlice';
import { FormEvent, useEffect } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useModal } from '../../hooks/useModal';
import { ModalStatus } from '../../components/modal-status/modal-status';
import { Status } from '../../components/status/status';

export const ResetPasswordPage = () => {
  const dispatch = useAppDispatch();
  const resetPassword = useAppSelector(getStateResetPassword);
  const isLoadingResetPassword = useAppSelector(getStateResetPasswordLoading);
  const isErrorResetPassword = useAppSelector(getStateResetPasswordError);
  const [password, setPassword] = useInput();
  const [token, setToken] = useInput();
  const { isModalOpen, closeModal, openModal } = useModal();
  const navigate = useNavigate();

  const onSubmitClick = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(postResetPassword({ password, token }));
  };

  useEffect(() => {
    if (!localStorage.getItem('isForgot')) {
      navigate(FORGOT_PASSWORD);
    }
  }, []);

  useEffect(() => {
    if (isErrorResetPassword) {
      openModal();
    }
  }, [isErrorResetPassword]);

  return (
    <>
      {(isLoadingResetPassword)
        ?   <Status status='Проверка данных...'/>
        :   (!resetPassword.success) ?
          <div
            className={`${styles.center}`}
            style={{ height: HEIGHT_WITHOUT_HEADER }}
          >
            <p className='text text_type_main-medium mb-6'>
              Восстановление пароля
            </p>
            <form onSubmit={onSubmitClick} className={`${styles.center}`}>
              <div className='mb-6'>
                <PasswordInput placeholder='Введите новый пароль' value={password} onChange={setPassword}/>
              </div>
              <div className='mb-6'>
                <Input placeholder='Введите код из письма' value={token} onChange={setToken}/>
              </div>
              <div className='mb-20'>
                <Button htmlType="submit" type="primary" size="medium">
                  Сохранить
                </Button>
              </div>
            </form>
            <p className='text text_type_main-default text_color_inactive'>
              Вспомнили пароль? <Link to={LOGIN} className={`${styles.text}`}>Войти</Link>
            </p>
          </div>
          :   <Navigate to={LOGIN} />
      }
      {isModalOpen &&
        <ModalStatus
          header='Введены неверные данные'
          closeModal={closeModal}
        />
      }
    </>
  );
};
