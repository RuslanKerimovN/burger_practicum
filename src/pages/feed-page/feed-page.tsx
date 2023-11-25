import { useLocation } from 'react-router';
import styles from './feed-page.module.css';
import { TapeOrders } from '../../components/tape-orders/tape-orders.tsx';
import { FeedCommonInfo } from '../../components/feed-common-info/feed-common-info.tsx';
export const FeedPage = () => {
  const location = useLocation();
  localStorage.setItem('noLogin', `${location.pathname}`);

  return (
    <div className={`${styles.content}`}>
      <div className={`${styles.orders}`}>
        <TapeOrders label={'Лента заказов'}/>
      </div>
      <div className={`${styles.info}`}>
        <FeedCommonInfo/>
      </div>
    </div>
  );
};
