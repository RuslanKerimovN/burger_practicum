import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { IBurgerIngredients } from '../../types/types';
import detailsStyle from './ingredient-details.module.css';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getIngredients, getStateIngredients } from '../../services/slices/ingredientsSlice';
import { useParams } from 'react-router';
import { baseIngredient } from '../../types/baseObjects';

interface ISectionProps {
    name: string;
    params: number;
    padding: string;
}

const OneSection = ({ name, params, padding }: ISectionProps) => (
  <section className={`${detailsStyle.section} ${padding}`}>
    <p className="text text_type_main-default text_color_inactive">
      {name}
    </p>
    <p className="text text_type_main-default text_color_inactive">
      {params}
    </p>
  </section>
);

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
        <OneSection name={'Калории,ккал'} params={calories} padding='mr-5'/>
        <OneSection name={'Белки, г'} params={proteins} padding='mr-5'/>
        <OneSection name={'Жиры, г'} params={fat} padding='mr-5'/>
        <OneSection name={'Углеводы, г'} params={carbohydrates} padding=''/>
      </div>
    </div>
  );
};
