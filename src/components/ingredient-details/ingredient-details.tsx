import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { IBurgerIngredients } from '../../types/types';
import detailsStyle from './ingredient-details.module.css';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getIngredients } from '../../services/slices/ingredientsSlice/ingredientsSlice.ts';
import { useParams } from 'react-router';
import { baseIngredient } from '../../types/baseObjects';
import { IngredientInfo } from '../ingredient-info/ingredient-info.tsx';
import { getStateIngredients } from '../../services/slices/ingredientsSlice/ingredientsSelector.ts';

export const IngredientDetails = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();
  const ingredients = useAppSelector(getStateIngredients);
  const [showElement, setShowElement] = useState<IBurgerIngredients>(baseIngredient);
  const { image_large, name, calories, proteins, fat, carbohydrates } = showElement;

  useEffect(() => {
    if (id && !ingredients.length) {
      dispatch(getIngredients());
    }
  }, [dispatch, id, ingredients]);

  useEffect(() => {
    const index = ingredients.findIndex((el) => el._id === id);
    if (index > -1) setShowElement(ingredients[index]);
  }, [ingredients, id]);

  return (
    <div className={`${detailsStyle.card}`}>
      <img alt={name} src={image_large} className='mb-4'/>
      <div>
        <p className={` ${detailsStyle.header} text text_type_main-medium mb-8`} >
          {name}
        </p>
      </div>
      <div className={`${detailsStyle.foodValue}`}>
        <IngredientInfo name={'Калории,ккал'} params={calories} padding='mr-5'/>
        <IngredientInfo name={'Белки, г'} params={proteins} padding='mr-5'/>
        <IngredientInfo name={'Жиры, г'} params={fat} padding='mr-5'/>
        <IngredientInfo name={'Углеводы, г'} params={carbohydrates} padding=''/>
      </div>
    </div>
  );
};
