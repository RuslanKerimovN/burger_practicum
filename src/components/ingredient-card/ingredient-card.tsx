import { IBurgerIngredients } from '../../types/types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientCardStyle from './ingredient-card.module.css';
import { useModal } from '../../hooks/useModal';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addIngredientInConstructor, getStateConstructor } from '../../services/slices/constructorSlice';
import { useDrag } from 'react-dnd';
import { useAppSelector } from '../../hooks/useAppSelector';
import { findCount } from '../../helpers/helpers';
import { useEffect, useState } from 'react';
import { saveWatchIngredient } from '../../services/slices/showIngredientSlice';

interface Props {
    ingredient: IBurgerIngredients;
}

export const IngredientCard = ({ ingredient }: Props) => {
  const dispatch = useAppDispatch();
  const constructor = useAppSelector(getStateConstructor);
  const { openModal } = useModal();
  const { name } = ingredient;
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setCount(findCount(constructor, ingredient.name));
  }, [constructor, ingredient]);

  const onOpenClick = (): void => {
    openModal();
    dispatch(saveWatchIngredient(ingredient));
  };

  const [, drag] = useDrag(() => ({
    type: 'ingredient',
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<IBurgerIngredients>();
      if (item && dropResult) {
        dispatch(addIngredientInConstructor({ ingredient, uniqId: `${Math.random()}` }));
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId()
    })
  }));
    
  return (
    <>
      <div ref={drag} className={`${ingredientCardStyle.card} pb-8`} onClick={onOpenClick}>
        <Counter count={count} size="default"/>

        <img alt={ingredient.name} src={ingredient.image_large} className='pl-4 pr-4 mb-1' width={'220px'} />
                
        <p className="text text_type_digits-default mb-1">
          <span className={`${ingredientCardStyle.price}`}>
            {ingredient.price}<CurrencyIcon type="primary" />
          </span>
        </p>
                
        <p className={`text text_type_main-default ${ingredientCardStyle.name}`}>
          {ingredient.name}
        </p>
      </div>
    </>
  );
};
