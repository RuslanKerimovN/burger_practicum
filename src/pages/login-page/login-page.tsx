import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login-page.module.css';
import { Link, Navigate } from 'react-router-dom';
import { HEIGHT_WITHOUT_HEADER } from '../../constants/constants';
import { FORGOT_PASSWORD, HOME, REGISTER } from '../../constants/path';
import { postLogin } from '../../services/slices/loginSlice/loginSlice.ts';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useInput } from '../../hooks/useInput';
import { FormEvent, useEffect } from 'react';
import { useModal } from '../../hooks/useModal';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Status } from '../../components/status/status';
import { ModalStatus } from '../../components/modal-status/modal-status';
import {
  getStateErrorLogin,
  getStateLoadingLogin,
  getStateLogin
} from '../../services/slices/loginSlice/loginSelector.ts';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const { isModalOpen, closeModal, openModal } = useModal();
  const login = useAppSelector(getStateLogin);
  const isLoginLoading = useAppSelector(getStateLoadingLogin);
  const isLoginError = useAppSelector(getStateErrorLogin);

  const onSubmitClick = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(postLogin({ email, password }));
  };

  useEffect(() => {
    localStorage.removeItem('isForgot');
    if (isLoginError) {
      openModal();
    }
  }, [isLoginError]);

  return (
    <>
      {(isLoginLoading)
        ?   <Status status='Проверка данных...'/>
        :   (!login.success) ?
          <div
            className={`${styles.login}`}
            style={{ height: HEIGHT_WITHOUT_HEADER }}
          >
            <p className='text text_type_main-medium mb-6'>
              Вход
            </p>
            <form onSubmit={onSubmitClick} className={`${styles.login}`}>
              <div className='mb-6'>
                <Input placeholder='E-mail' value={email} onChange={setEmail}/>
              </div>
              <div className='mb-6'>
                <PasswordInput placeholder='Пароль' value={password} onChange={setPassword}/>
              </div>
              <div className='mb-20'>
                <Button htmlType="submit" type="primary" size="medium">
                  Войти
                </Button>
              </div>
            </form>
            <p className='text text_type_main-default text_color_inactive mb-4'>
              Вы - новый пользователь? <Link to={REGISTER} className={`${styles.text}`}>Зарегистрироваться</Link>
            </p>
            <p className="text text_type_main-default text_color_inactive">
              Забыли пароль? <Link to={FORGOT_PASSWORD} className={`${styles.text}`}>Восстановить пароль</Link>
            </p>
          </div>
          :   <Navigate to={localStorage.getItem('noLogin') || HOME} />
      }
      {isModalOpen &&
        <ModalStatus
          header='Неверный логин или пароль'
          closeModal={closeModal}
        />
      }
    </>
  );
};
