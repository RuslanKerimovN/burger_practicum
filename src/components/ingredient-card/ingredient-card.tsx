import { IBurgerIngredients } from '../../types/types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientCardStyle from './ingredient-card.module.css';

interface Props {
    ingredient: IBurgerIngredients;
}

export const IngredientCard = ({ingredient}: Props) => {
    return (
        <div className={`${ingredientCardStyle.card} pb-8`}>
            <Counter count={1} size="default"/>
            <img alt='' src={ingredient.image_large} className='pl-4 pr-4 mb-1' width={'220px'} />
            <p className="text text_type_digits-default mb-1">
                <span className={ingredientCardStyle.price}>
                    {ingredient.price}<CurrencyIcon type="primary" />
                </span>
            </p>
            <p className={`text text_type_main-default${ingredientCardStyle.name}`}>
                {ingredient.name}
            </p>
        </div>
    );
};
