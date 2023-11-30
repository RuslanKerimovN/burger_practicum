import styles from './feed-common-info.module.css';
import { ORDERS_HEIGHT } from '../../constants/constants.ts';
import { useAppSelector } from '../../hooks/useAppSelector.tsx';

export const FeedCommonInfo = () => {
  const { feedOrders, feedDone, feedPending } = useAppSelector((store) => store.feedSlice);

  if (!feedOrders) {
    return null;
  }

  return(
    <div className={`${styles.panel} mt-20 ml-10 mr-5`} style={{ height: ORDERS_HEIGHT }}>
      <div className={`${styles.orderNumbers} mt-4 mb-15`}>
        <section className={`${styles.section}`}>
          <p className='text text_type_main-medium pb-6'>Готовы:</p>
          <div className={`${styles.sectionContent}`}>
            {
              feedDone.map((el, index) => (
                <p
                  key={index}
                  className={`${styles.success} text text_type_digits-default mt-2`}
                >
                  {el.number}
                </p>
              ))
            }
          </div>
        </section>
        <div/>
        <section className={`${styles.section}`}>
          <p className='text text_type_main-medium pb-6'>В работе:</p>
          <div className={`${styles.sectionContent}`}>
            {
              feedPending.map((el, index) => (
                <p
                  key={index}
                  className='text text_type_digits-default mt-2'
                >
                  {el.number}
                </p>
              ))
            }
          </div>
        </section>
      </div>
      <section className='mb-15'>
        <p className='text text_type_main-medium'>Выполнено за все время:</p>
        <p className={`${styles.shadow} text text_type_digits-large`}>{feedOrders.total}</p>
      </section>
      <section>
        <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
        <p className={`${styles.shadow} text text_type_digits-large`}>{feedOrders.totalToday}</p>
      </section>
    </div>
  );
};
