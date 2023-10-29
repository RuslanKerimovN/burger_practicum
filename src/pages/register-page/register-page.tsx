import { FormEvent, useEffect } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register-page.module.css';
import { HEIGHT_WITHOUT_HEADER } from '../../constants/constants';
import { Link, Navigate } from 'react-router-dom';
import { HOME, LOGIN } from '../../constants/path';
import { useInput } from '../../hooks/useInput';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getStateErrorRegisterData, getStateLoadingRegisterData, getStateRegisterData, postRegister } from '../../services/slices/registerSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Status } from '../../components/status/status';
import { useModal } from '../../hooks/useModal';
import { ModalStatus } from '../../components/modal-status/modal-status';

export const RegisterPage = () => {
    const dispatch = useAppDispatch();
    const [name, setName] = useInput();
    const [email, setEmail] = useInput();
    const [password, setPassword] = useInput();
    const registerData = useAppSelector(getStateRegisterData);
    const isRegisterLoading = useAppSelector(getStateLoadingRegisterData);
    const isRegisterError = useAppSelector(getStateErrorRegisterData);
    const {isModalOpen, closeModal, openModal} = useModal();
    
    const onSubmitClick = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(postRegister({email, password, name}));
    };

    useEffect(() => {
        if (isRegisterError) {
            openModal();
        }
    }, [isRegisterError]);

    return (
        <>
            {(isRegisterLoading)
                ?   <Status status='Проверка данных...' />
                :   (!registerData.success) ?
                        <div
                            className={`${styles.center}`}
                            style={{height: HEIGHT_WITHOUT_HEADER}}
                        >
                            <p className={`text text_type_main-medium mb-6`}>
                                Регистрация
                            </p>
                            <form onSubmit={onSubmitClick} className={`${styles.center}`}>
                                <div className='mb-6'>
                                    <Input placeholder='Имя' value={name} onChange={setName}/>
                                </div>
                                <div className='mb-6'>
                                    <Input placeholder='E-mail' value={email} onChange={setEmail}/>
                                </div>
                                <div className='mb-6'>
                                    <PasswordInput placeholder='Пароль' value={password} onChange={setPassword}/>
                                </div>
                                <div className='mb-20'>
                                    <Button htmlType="submit" type="primary" size="medium">
                                        Зарегистрироваться
                                    </Button>
                                </div>
                            </form>
                            <p className={`text text_type_main-default text_color_inactive`}>
                                Уже зарегистрированы? <Link to={LOGIN} className={`${styles.text}`}>Войти</Link>
                            </p>
                        </div>
                    :   <Navigate to={localStorage.getItem('noLogin') || HOME} />
            }
            {isModalOpen &&
                <ModalStatus
                    header='Заполните все поля ввода данными'
                    closeModal={closeModal}
                />
            }
        </>
    );
}
