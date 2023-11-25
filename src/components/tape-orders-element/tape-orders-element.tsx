import styles from './tape-orders-element.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface Props {
    orderNumber: string;
    orderDate: string;
    orderName: string;
    orderPrice: string;
    // orderIngredients: string[];
}
export const TapeOrdersElement = ({ orderNumber, orderDate, orderName, orderPrice }: Props) => {
  return(
    <div className={`${styles.background} p-6 mb-4`}>
      <div className={`${styles.numberAndDate} mb-6`}>
        <p className='text text_type_digits-default'>
          {orderNumber}
        </p>
        <p className='text text_type_main-default text_color_inactive'>
          {orderDate}
        </p>
      </div>
      <p className='text text_type_main-medium mb-6'>{orderName}</p>
      <div className={`${styles.ingredientsAndPrice}`}>
        <div>
          {'1234'}
        </div>
        <div className={`${styles.price}`}>
          <p className='text text_type_digits-default'>
            {orderPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
