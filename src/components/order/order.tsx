import styles from './order.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../../hooks/useAppDispatch.tsx';
import { useParams } from 'react-router';
import { useEffect, useMemo } from 'react';
import {
  getOrderInfo,
  getStateErrorOrderInfo,
  getStateLoadingOrderInfo,
  getStateOrderInfo
} from '../../services/slices/orderInfoSlice.ts';
import { useAppSelector } from '../../hooks/useAppSelector.tsx';
import { getIngredients, getStateIngredients } from '../../services/slices/ingredientsSlice.ts';
import { getPriceOneOrder, getStatus } from '../../helpers/helpers.ts';

export const Order = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();
  const allIngredients = useAppSelector(getStateIngredients);
  const orderInfo = useAppSelector(getStateOrderInfo);
  const isLoadingOrderInfo = useAppSelector(getStateLoadingOrderInfo);
  const isErrorOrderInfo = useAppSelector(getStateErrorOrderInfo);
  const price: number = useMemo(() => {
    return getPriceOneOrder(orderInfo.ingredients, allIngredients);
  }, [orderInfo, allIngredients]);

  useEffect(() => {
    if (!allIngredients.length) {
      dispatch(getIngredients());
    }
  }, [allIngredients, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getOrderInfo(id));
    }
  }, [id, dispatch]);


  if (!id || isErrorOrderInfo) {
    return (
      <div className={`${styles.container}`}>
        <p className='text text_type_main-large mb-3'>
        Ошибка сервера, попробуйте еще раз позднее!
        </p>
      </div>
    );
  }

  if (isLoadingOrderInfo) {
    return (
      <div className={`${styles.container}`}>
        <p className='text text_type_main-large mb-3'>
        Загрузка данных, подождите!
        </p>
      </div>
    );
  }

  return(
    <div className={`${styles.container}`}>
      <p className={`${styles.number} text text_type_digits-medium mb-10`}>
        {`#${orderInfo.number}`}
      </p>
      <p className='text text_type_main-medium mb-3'>
        {orderInfo.name}
      </p>
      <p className={`${styles.status} text text_type_main-default mb-15`}>
        {getStatus(orderInfo.status)}
      </p>
      <p className='text text_type_main-medium mb-6'>Состав:</p>
      <div className='mb-10' style={{ background: 'red', height: '300px', overflowY: 'auto' }}>

      </div>
      <div className={`${styles.dateAndPrice}`}>
        <p className='text text_type_main-default text_color_inactive'>
          <FormattedDate date={new Date(orderInfo.createdAt)} />
        </p>
        <p className={`${styles.price} text text_type_digits-default`}>{price}<CurrencyIcon type="primary" /></p>
      </div>
    </div>
  );
};
