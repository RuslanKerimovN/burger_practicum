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
        <section className={'mt-10'} >
            <p className="text text_type_main-medium mb-6">
                {header(type)}
            </p>
            <div className={`${positionMenuStyle.ingredients} pl-4 pr-4`}>
                {
                    cardArray(type, menu).map((el, index) => (
                        <div
                            key={el['_id']}
                            className={`${(index % 2 === 0) ? 'mr-6' : ''} ${positionMenuStyle.card}`}
                        >
                            <IngredientCard ingredient={el} />
                        </div>
                    ))
                }
            </div>
        </section>
    );
};
