import { TapeOrders } from '../../components/tape-orders/tape-orders.tsx';
import { useAppSelector } from '../../hooks/useAppSelector.tsx';
import { useEffect } from 'react';
import { connect, disconnect } from '../../services/actions/web-socket-actions.ts';
import { useAppDispatch } from '../../hooks/useAppDispatch.tsx';
import { getCookie } from '../../helpers/helpers.ts';
import { ACCESS_TOKEN, HEIGHT_WITHOUT_HEADER } from '../../constants/constants.ts';
import styles from './history-orders-page.module.css';

export const HistoryOrdersPage = () => {
  const dispatch = useAppDispatch();
  const { historyOrders } = useAppSelector((store) => store.historyOrdersSlice);

  useEffect(() => {
    const token = getCookie(ACCESS_TOKEN);

    dispatch(connect(`wss://norma.nomoreparties.space/orders?token=${token}`));

    return () => {
      dispatch(disconnect());
    };
  }, []);

  if (!historyOrders) {
    return (
      <div className={`${styles.loading}`} style={{ height: HEIGHT_WITHOUT_HEADER }}>
        <p className='text text_type_main-large mb-3'>
          Загрузка данных, подождите!
        </p>
      </div>
    );
  }

  return (
    <TapeOrders orders={historyOrders}/>
  );
};
