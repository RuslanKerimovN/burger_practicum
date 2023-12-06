import styles from './change-profile.module.css';
import { HEIGHT_WITHOUT_HEADER } from '../../constants/constants.ts';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  patchUser,
  resetChanges,
  setUserEmail,
  setUserName,
  setUserPassword
} from '../../services/slices/userSlice/userSlice.ts';
import { useAppDispatch } from '../../hooks/useAppDispatch.tsx';
import { useAppSelector } from '../../hooks/useAppSelector.tsx';
import { ChangeEvent, useEffect } from 'react';
import { setLoginName } from '../../services/slices/loginSlice/loginSlice.ts';
import {
  getStateIsChangeData,
  getStateName,
  getStateUserEmail,
  getStateUserName,
  getStateUserPassword
} from '../../services/slices/userSlice/userSelector.ts';

export const ChangeProfile = () => {
  const dispatch = useAppDispatch();
  const userEmail =  useAppSelector(getStateUserEmail);
  const userName = useAppSelector(getStateUserName);
  const userPassword = useAppSelector(getStateUserPassword);
  const isChangeData = useAppSelector(getStateIsChangeData);
  const name = useAppSelector(getStateName);

  const onChange = (e: ChangeEvent<HTMLInputElement>, name: string): void => {
    if (name === 'name') {
      dispatch(setUserName(e.target.value));
    } else if (name === 'email') {
      dispatch(setUserEmail(e.target.value));
    } else {
      dispatch(setUserPassword(e.target.value));
    }
  };

  useEffect(() => {
    dispatch(setLoginName(name));
  }, [name]);

  return (
    <div
      className={`${styles.items} mt-30`}
      style={{ height: HEIGHT_WITHOUT_HEADER }}
    >
      <div className='mb-6'>
        <Input
          placeholder='Имя'
          value={userName}
          onChange={(e) => onChange(e, 'name')}
          icon={'EditIcon'}
        />
      </div>
      <div className='mb-6'>
        <Input
          placeholder='Логин'
          value={userEmail}
          onChange={(e) => onChange(e, 'email')}
          icon={'EditIcon'}
        />
      </div>
      <div className='mb-6'>
        <Input
          placeholder='Пароль'
          value={userPassword}
          onChange={(e) => onChange(e, 'password')}
          icon={'EditIcon'}
        />
      </div>
      {isChangeData ?
        <div>
          <div className={`${styles.buttons}`}>
            <Button
              htmlType='button'
              type='secondary'
              onClick={() => dispatch(patchUser({ name: userName, email: userEmail, password: userPassword }))}
            >
              Сохранить
            </Button>
            <Button htmlType='button' onClick={() => dispatch(resetChanges())}>
              Отменить
            </Button>
          </div>
        </div>
        :   <></>
      }
    </div>
  );
};

