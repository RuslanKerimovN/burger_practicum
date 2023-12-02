import { memo, useEffect, useState } from 'react';
import { Tabs } from '../../components/tabs/tabs.tsx';
import ingredientsStyle from './burger-ingredients.module.css';
import { useAppSelector } from '../../hooks/useAppSelector.tsx';
import { useAppDispatch } from '../../hooks/useAppDispatch.tsx';
import {
  getIngredients,
  getStateIngredients,
  getStateLoadingIngredients
} from '../../services/slices/ingredientsSlice.ts';
import { IIngredientsArray } from '../../types/types.ts';
import { getTabs } from '../../helpers/helpers.ts';

export const BurgerIngredients = memo(() => {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(getStateIngredients);
  const isLoadingIngredients = useAppSelector(getStateLoadingIngredients);
  const [ingredientsArray, setIngredientsArray] = useState<IIngredientsArray[]>([]);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredients]);

  useEffect(() => {
    const tmp = getTabs(ingredients);
    setIngredientsArray(tmp);
  }, [ingredients]);

  return (
    <section className={`${ingredientsStyle.panel} mt-10 mr-5 ml-5`}>
      {ingredients.length ?
        <>
          <p className="text text_type_main-large mb-5">
            Соберите бургер
          </p>
          <Tabs ingredients={ingredientsArray}/>
        </>
        : (!ingredients.length && isLoadingIngredients)
          ? <h1 className={`${ingredientsStyle.attention}`}>Загрузка...</h1>
          :
          <h1 className={`${ingredientsStyle.attention}`}>
            Ошибка загрузки ингредиентов, перезагрузите страницу!
          </h1>
      }
    </section>
  );
});
