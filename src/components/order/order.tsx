import styles from './order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface Props {
    orderNumber: string;
    orderDate: string;
    orderName: string;
    orderPrice: string;
    orderStatus: string;
    // orderIngredients: string[];
}
export const Order = ({
  orderNumber='123',
  orderDate='22.01.2002',
  orderName='fasfasfasfasfasfasfasfasfasfasulka',
  orderPrice='4321',
  orderStatus='Выполнен'
}: Partial<Props>) => {
  return(
    <div className={`${styles.container}`}>
      <p className={`${styles.number} text text_type_digits-default mb-10`}>
        {orderNumber}
      </p>
      <p className='text text_type_main-medium mb-3'>
        {orderName}
      </p>
      <p className={`${styles.status} text text_type_main-default mb-15`}>
        {orderStatus}
      </p>
      <p className='text text_type_main-medium mb-6'>Состав:</p>
      <div className='mb-10'>

      </div>
      <div className={`${styles.dateAndPrice}`}>
        <p className='text text_type_main-default text_color_inactive'>{orderDate}</p>
        <p className={`${styles.price}`}>{orderPrice}<CurrencyIcon type="primary" /></p>
      </div>
    </div>
  );
};

