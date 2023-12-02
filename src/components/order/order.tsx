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
import { getOrderStucture, getPriceOneOrder, getStatus } from '../../helpers/helpers.ts';
import { IOrderStructure } from '../../types/types.ts';

export const Order = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();
  const allIngredients = useAppSelector(getStateIngredients);
  const orderInfo = useAppSelector(getStateOrderInfo);
  const isLoadingOrderInfo = useAppSelector(getStateLoadingOrderInfo);
  const isErrorOrderInfo = useAppSelector(getStateErrorOrderInfo);
  const validOrderInfo: {orderStructure: IOrderStructure[], price: number } = useMemo(() => {
    return {
      price: getPriceOneOrder(orderInfo.ingredients, allIngredients),
      orderStructure: getOrderStucture(orderInfo.ingredients, allIngredients)
    };
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
      <div className='mb-10' style={{ height: '300px', overflowY: 'auto' }}>
        {
          validOrderInfo.orderStructure.map((el) => (
            <div key={el._id} className={`${styles.structureContainer} pr-6 mb-4`}>
              <div className={`${styles.structureImgAndName} mr-4`}>
                <div className={`${styles.circleImage} mr-4`}>
                  <img
                    alt={el.name}
                    src={el.image_mobile}
                    className={`${styles.img}`}
                  />
                </div>
                <p className='text text_type_main-default'>{el.name}</p>
              </div>
              <div className={`${styles.structurePrice}`}>
                <p className='text text_type_digits-default'>
                  {`${el.quantityOneIngredient} x ${el.priceIngredient}`}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          ))
        }
      </div>
      <div className={`${styles.dateAndPrice}`}>
        <p className='text text_type_main-default text_color_inactive'>
          <FormattedDate date={new Date(orderInfo.updatedAt)} />
        </p>
        <p className={`${styles.price} text text_type_digits-default`}>
          {validOrderInfo.price}<CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
};
