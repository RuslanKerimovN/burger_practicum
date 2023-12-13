import styles from './tape-orders.module.css';
import { TapeOrdersElement } from '../tape-orders-element/tape-orders-element.tsx';
import { ORDERS_HEIGHT } from '../../constants/constants.ts';
import { Link, useLocation } from 'react-router-dom';
import { ITapeOrders } from '../../types/types.ts';
import { useAppSelector } from '../../hooks/useAppSelector.tsx';
import { getIngredients } from '../../services/slices/ingredientsSlice/ingredientsSlice.ts';
import { getPriceOneOrder } from '../../helpers/helpers.ts';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch.tsx';
import { getStateIngredients } from '../../services/slices/ingredientsSlice/ingredientsSelector.ts';

interface Props {
    label: string;
    orders: ITapeOrders;
}

export const TapeOrders = ({ label, orders }: Partial<Props>) => {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(getStateIngredients);
  const location = useLocation();

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, []);

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
          orders?.orders.map((el, index)=> (
            <div key={index}>
              <Link
                to={`${location.pathname}/${el.number}`}
                state={{ backgroundLocation: location }}
                className={`${styles.links}`}
              >
                <TapeOrdersElement
                  order={el}
                  price={getPriceOneOrder(el.ingredients, ingredients)}
                />
              </Link>
            </div>
          ))
        }
      </div>
    </section>
  );
};
