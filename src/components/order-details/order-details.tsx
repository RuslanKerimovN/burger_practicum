import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { SvgOrder } from '../../images/svg-order';
import { getStateErrorOrder, getStateLoadingOrder, getStateOrder, postOrder } from '../../services/slices/orderSlice';
import detailsStyle from './order-details.module.css';
import { useEffect } from 'react';

interface Props {
    ids: string[];
}

export const OrderDetails = ({ ids }: Props) => {
  const dispatch = useAppDispatch();
  const order = useAppSelector(getStateOrder);
  const isLoadingOrder = useAppSelector(getStateLoadingOrder);
  const isErrorOrder = useAppSelector(getStateErrorOrder);
    
  useEffect(() => {
    dispatch(postOrder(ids));
  }, [dispatch, ids]); 

  return (
    <>
      {isLoadingOrder
        ?   <h1>Загрузка....</h1>
        :   isErrorOrder ? <h1>Ошибка сервера, попробуйте еще раз!</h1>
          :
          <div className={`${detailsStyle.card}`}>
            <div>
              <p className={`${detailsStyle.text} text text_type_digits-large mb-8`}>
                {order.order.number}
              </p>
            </div>

            <div>
              <p className={`${detailsStyle.text} text text_type_main-medium mb-15`}>
                идентификатор заказа
              </p>
            </div>

            <div className="mb-15">
              <SvgOrder />
            </div>
                            
            <section>
              <p className={`${detailsStyle.text} text text_type_main-default mb-2`}>
                Ваш заказ начали готовить
              </p>
              <p className={`${detailsStyle.text} text text_type_main-default text_color_inactive mb-15`}>
                Дождитесь готовности на орбитальной станции
              </p>
            </section>
          </div>
      }
    </>
  );
};
