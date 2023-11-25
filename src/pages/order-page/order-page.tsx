import styles from './order-page.module.css';
import { HEIGHT_WITHOUT_HEADER } from '../../constants/constants.ts';
import { Order } from '../../components/order/order.tsx';

export const OrderPage = () => (
  <div className={`${styles.page}`} style={{ height: HEIGHT_WITHOUT_HEADER }}>
    <Order />
  </div>
);
