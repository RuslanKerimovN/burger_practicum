import { memo, useEffect, useState } from 'react';
import { Tabs } from '../../components/tabs/tabs.tsx';
import ingredientsStyle from './burger-ingredients.module.css';
import { useAppSelector } from '../../hooks/useAppSelector.tsx';
import { useAppDispatch } from '../../hooks/useAppDispatch.tsx';
import { getIngredients } from '../../services/slices/ingredientsSlice/ingredientsSlice.ts';
import { IIngredientsArray } from '../../types/types.ts';
import { getTabs } from '../../helpers/helpers.ts';
import {
  getStateErrorIngredients,
  getStateIngredients,
  getStateLoadingIngredients
} from '../../services/slices/ingredientsSlice/ingredientsSelector.ts';

export const BurgerIngredients = memo(() => {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(getStateIngredients);
  const isLoadingIngredients = useAppSelector(getStateLoadingIngredients);
  const isErrorIngredients = useAppSelector(getStateErrorIngredients);
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

  if (!ingredients.length && isLoadingIngredients) {
    return (
      <section className={`${ingredientsStyle.panel} mt-10 mr-5 ml-5`}>
        <p className={`${ingredientsStyle.attention} text text_type_main-large mb-3`}>
          Загрузка данных, подождите!
        </p>
      </section>
    );
  }

  if (isErrorIngredients) {
    return (
      <section className={`${ingredientsStyle.panel} mt-10 mr-5 ml-5`}>
        <p className={`${ingredientsStyle.attention} text text_type_main-large mb-3`}>
          Ошибка загрузки ингредиентов, перезагрузите страницу!
        </p>
      </section>
    );
  }

  return (
    <section className={`${ingredientsStyle.panel} mt-10 mr-5 ml-5`}>
      <>
        <p className="text text_type_main-large mb-5">
          Соберите бургер
        </p>
        <Tabs ingredients={ingredientsArray}/>
      </>
    </section>
  );
});
