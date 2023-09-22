import { IBurgerIngredients } from '../../types/types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientCardStyle from './ingredient-card.module.css';

interface Props {
    ingredient: IBurgerIngredients;
}

export const IngredientCard = ({ingredient}: Props) => {
    return (
        <div className={ingredientCardStyle.card}>
            {/* <Counter count={1} size="default" extraClass="m-1" /> */}
            <img alt='' src={ingredient.image_large} className='pl-4 pr-4 mb-1' width={'200px'} />
            <p className="text text_type_digits-medium mb-1">
                {ingredient.price}<CurrencyIcon type="primary" />
            </p>
            <p className={`text text_type_main-default mb-10 ${ingredientCardStyle.name}`}>
                {ingredient.name}
            </p>
        </div>
    );
};
