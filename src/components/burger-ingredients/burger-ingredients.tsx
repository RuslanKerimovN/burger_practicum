import React, { memo, useEffect, useState } from 'react';
import { Tabs } from '../tabs/tabs';
import ingredientsStyle from './burger-ingredients.module.css';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getIngredients } from '../../services/slices/restaurantSlice';
import { IIngredientsArray } from '../../types/types';
import { tabArray } from '../../helpers/helpers';

export const BurgerIngredients = memo(() => {
    const dispatch = useAppDispatch();
    const {ingredients, isLoading} = useAppSelector(state => state.restaurantSlice);
    const [ingredientsArray, setIngredientsArray] = useState<IIngredientsArray[]>([]);

    useEffect(() => {
      dispatch(getIngredients());
    }, [dispatch]);

    useEffect(() => {
        const tmp = tabArray(ingredients);
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
                : (!ingredients.length && isLoading)
                    ? <h1 className={`${ingredientsStyle.attention}`}>Loading...</h1>
                    :
                        <h1 className={`${ingredientsStyle.attention}`}>
                            Ошибка загрузки ингредиентов, перезагрузите страницу!
                        </h1>
            }
        </section>
    );
})
