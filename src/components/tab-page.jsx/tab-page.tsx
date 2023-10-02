import { tabArray } from '../../helpers/helpers';
import { IBurgerIngredients } from '../../types/types';
import { PositionMenu } from '../position-menu/position-menu';

interface Props {
    ingredients: IBurgerIngredients[];
    type1: 'bun' | 'sauce' | 'main';
    type2: 'bun' | 'sauce' | 'main';
    type3: 'bun' | 'sauce' | 'main';
}

export const TabPage = ({ingredients, type1, type2, type3}: Props) => {
    const menu: IBurgerIngredients[][] = tabArray(ingredients);

    return (
        <>
            {menu.length &&
                <>
                    <PositionMenu type={type1} menu={menu} />
                    <PositionMenu type={type2} menu={menu} />
                    <PositionMenu type={type3} menu={menu} />
                </>
            }
        </>
    );
};
