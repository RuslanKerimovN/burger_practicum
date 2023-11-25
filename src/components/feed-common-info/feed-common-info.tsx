import styles from './feed-common-info.module.css';
import { ORDERS_HEIGHT } from '../../constants/constants.ts';

export const FeedCommonInfo = () => {
  return(
    <div className={`${styles.panel} mt-20 ml-10 mr-5`} style={{ height: ORDERS_HEIGHT }}>
      <div className={`${styles.orderNumbers} mt-4 mb-15`}>
        <section>
          <p className='text text_type_main-medium pb-6'>Готовы:</p>
          {
            ['11', '11', '11'].map((el, index) => (
              <p
                key={index}
                className={`${styles.success} text text_type_digits-default mt-2`}
              >
                {el}
              </p>
            ))
          }
        </section>
        <div/>
        <section>
          <p className='text text_type_main-medium pb-6'>В работе:</p>
          {
            ['11', '11', '11'].map((el, index) => (
              <p
                key={index}
                className='text text_type_digits-default mt-2'
              >
                {el}
              </p>
            ))
          }
        </section>
      </div>
      <section className='mb-15'>
        <p className='text text_type_main-medium'>Выполнено за все время:</p>
        <p className={`${styles.shadow} text text_type_digits-large`}>28752</p>
      </section>
      <section>
        <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
        <p className={`${styles.shadow} text text_type_digits-large`}>138</p>
      </section>
    </div>
  );
};
