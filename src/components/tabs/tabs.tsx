import { useEffect, useRef, useState} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import tabsStyle from './tabs.module.css';
import { IIngredientsArray } from '../../types/types';
import { IngredientCard } from '../ingredient-card/ingredient-card';
import { useInView } from 'react-intersection-observer';
import { CONSTRUCTOR_HEIGHT } from '../../constants/constants';
import { Link, useLocation } from 'react-router-dom';

interface Props {
    ingredients: IIngredientsArray[];
}

export const Tabs = ({ingredients}: Props) => {
    const [current, setCurrent] = useState<string>('bun');
    const containerRef = useRef();
    let location = useLocation();

    const [bunRef, bunIsView] = useInView({
        threshold: 0,
        root: containerRef.current,
    })

    const [mainRef, mainIsView] = useInView({
        threshold: 0,
        root: containerRef.current,
    })

    const [saucesRef, saucesIsView] = useInView({
        threshold: 0,
        root: containerRef.current,
    })

    const refs = [bunRef, mainRef, saucesRef];
    
    useEffect(() => {
        if (bunIsView) {
            setCurrent('bun')
        } else if (mainIsView) {
            setCurrent('main')
        } else if (saucesIsView) {
            setCurrent('sauce')
        }
    }, [bunIsView, mainIsView, saucesIsView])

    return (
        <>
            <div className={`${tabsStyle.tabs}`}>
                <Tab value="bun" active={current === 'bun'} onClick={() => {}}>
                    Булки
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={() => {}}>
                    Начинки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={() => {}}>
                    Соусы
                </Tab>
            </div>
            <div style={{height: `${CONSTRUCTOR_HEIGHT}px`, overflowY: 'scroll'}}>
            {
                ingredients.map((el, index) => (
                        <section className={'mt-10'} key={el.header} ref={refs[index]}>
                            <p className="text text_type_main-medium mb-6">
                                {el.header}
                            </p>
                            <div className={`${tabsStyle.ingredients} pl-4 pr-4`}>
                                {
                                    el.body.map((el, index) => (
                                        <div
                                            key={el['_id']}
                                            className={`${(index % 2 === 0) ? 'mr-6' : ''} ${tabsStyle.card}`}
                                        >
                                            <Link key={el._id} to={`/ingredients/${el._id}`} state={{ backgroundLocation: location }} className={`${tabsStyle.links}`}>
                                                <IngredientCard ingredient={el} />
                                            </Link>
                                        </div>
                                    ))
                                }
                            </div>
                        </section>
                ))
            }
            </div>
        </>
    )
};
