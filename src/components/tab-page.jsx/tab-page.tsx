import { data } from '../../data/data';
import { tabArray } from '../../helpers/helpers';
import { IBurgerIngredients } from '../../types/types';
import { PositionMenu } from '../position-menu/position-menu';

interface Props {
    type1: 'bun' | 'sauce' | 'main';
    type2: 'bun' | 'sauce' | 'main';
    type3: 'bun' | 'sauce' | 'main';
}

export const TabPage = ({type1, type2, type3}: Props) => {
    const array: IBurgerIngredients[] = data;
    const menu: IBurgerIngredients[][] = tabArray(array);

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
