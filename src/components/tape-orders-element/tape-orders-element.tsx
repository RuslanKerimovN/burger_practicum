import styles from './tape-orders-element.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { IOrders, TOrderImages } from '../../types/types.ts';
import { baseOrderInfo } from '../../types/baseObjects.ts';
import { getOrderImages } from '../../helpers/helpers.ts';
import { useAppSelector } from '../../hooks/useAppSelector.tsx';
import { useMemo } from 'react';
import { getStateIngredients } from '../../services/slices/ingredientsSlice/ingredientsSelector.ts';

interface Props {
  order: IOrders;
  price: number;
}
export const TapeOrdersElement = ({ order = baseOrderInfo, price = 0 }: Props) => {
  const { number, updatedAt, name, ingredients } = order;
  const allIngredients = useAppSelector(getStateIngredients);
  const orderImages: TOrderImages[] = useMemo(() => {
    return getOrderImages(ingredients, allIngredients);
  }, [allIngredients, order]);

  return(
    <div className={`${styles.background} p-6 mb-4`}>
      <div className={`${styles.numberAndDate} mb-6`}>
        <p className='text text_type_digits-default'>
          {`#${number}`}
        </p>
        <p className='text text_type_main-default text_color_inactive'>
          <FormattedDate date={new Date(updatedAt)} />
        </p>
      </div>
      <p className='text text_type_main-medium mb-6'>{name}</p>
      <div className={`${styles.ingredientsAndPrice}`}>
        <div className={`${styles.imagesContainer}`}>
          {
            orderImages.map((el) => (
              <div key={el._id} className={`${styles.circleImage}`}>
                {el.quantityOneIngredient > 1 && (
                  <p className={`${styles.imageText} text_type_digits-default`}>
                    {`+${el.quantityOneIngredient}`}
                  </p>)
                }
                <img alt={el.name} src={el.image_mobile} className={`${styles.img}`}/>
              </div>
            ))
          }
        </div>
        <div className={`${styles.price}`}>
          <p className='text text_type_digits-default'>
            {price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
