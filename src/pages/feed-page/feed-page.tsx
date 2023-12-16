import { useLocation } from 'react-router';
import styles from './feed-page.module.css';
import { TapeOrders } from '../../components/tape-orders/tape-orders.tsx';
import { FeedCommonInfo } from '../../components/feed-common-info/feed-common-info.tsx';
import { useAppSelector } from '../../hooks/useAppSelector.tsx';
import { connect, disconnect } from '../../services/actions/web-socket-actions.ts';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch.tsx';
import { HEIGHT_WITHOUT_HEADER } from '../../constants/constants.ts';

export const FeedPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { feedOrders } = useAppSelector((store) => store.feedSlice);

  localStorage.setItem('noLogin', `${location.pathname}`);

  useEffect(() => {
    dispatch(connect('wss://norma.nomoreparties.space/orders/all'));

    return () => {
      dispatch(disconnect());
    };
  }, []);

  if (!feedOrders) {
    return (
      <div className={`${styles.loading}`} style={{ height: HEIGHT_WITHOUT_HEADER }}>
        <p className='text text_type_main-large mb-3'>
        Загрузка данных, подождите!
        </p>
      </div>
    );
  }

  return (
    <div className={`${styles.content}`}>
      <div className={`${styles.orders}`}>
        <TapeOrders label={'Лента заказов'} orders={feedOrders}/>
      </div>
      <div className={`${styles.info}`}>
        <FeedCommonInfo />
      </div>
    </div>
  );
};
