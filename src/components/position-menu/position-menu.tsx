import { header, cardArray } from '../../helpers/helpers';
import { IBurgerIngredients } from '../../types/types';
import { IngredientCard } from '../ingredient-card/ingredient-card';
import positionMenuStyle from './position-menu.module.css';

interface Props {
    type: 'bun' | 'sauce' | 'main';
    menu: IBurgerIngredients[][];
}

export const PositionMenu = ({type, menu}: Props) => {
    return(
        <section>
            <p className="text text_type_main-medium mb-6">
                {header(type)}
            </p>
            <div className={positionMenuStyle.ingredients}>
                {
                    cardArray(type, menu).map((el) => (
                        <div key={el['_id']} style={{width: '50%'}}>
                            <IngredientCard ingredient={el} />
                        </div>
                    ))
                }
            </div>
        </section>
    );
};
