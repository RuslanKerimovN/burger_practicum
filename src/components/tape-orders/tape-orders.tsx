import styles from './tape-orders.module.css';
import { TapeOrdersElement } from '../tape-orders-element/tape-orders-element.tsx';
import { ORDERS_HEIGHT } from '../../constants/constants.ts';
import { Link, useLocation } from 'react-router-dom';

interface Props {
    label: string;
}

export const TapeOrders = ({ label }: Partial<Props>) => {
  const location = useLocation();

  return(
    <section className={`${styles.panel} mt-10 mr-5 ml-5`}>
      {
        label
          ? <p className="text text_type_main-large mb-5">{label}</p>
          : <></>
      }
      <div
        className={`${styles.tape} pr-2`}
        style={{ height: ORDERS_HEIGHT }}
      >
        {
          ['qwerty', 'qwerty', 'qwerty', 'qwerty', 'qwerty'].map((el, index)=> (
            <div key={index}>
              <Link
                to={`${location.pathname}/${index}`}
                state={{ backgroundLocation: location }}
                className={`${styles.links}`}
              >
                <TapeOrdersElement
                  orderNumber={el}
                  orderDate={el}
                  orderName={el}
                  orderPrice={'1234'}
                  // orderIngredients={[el]}
                />
              </Link>
            </div>
          ))
        }
      </div>
    </section>
  );
};
