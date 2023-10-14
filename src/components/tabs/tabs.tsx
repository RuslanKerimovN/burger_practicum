import React, { useEffect, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import tabsStyle from './tabs.module.css';
import { IIngredientsArray } from '../../types/types';
import { IngredientCard } from '../ingredient-card/ingredient-card';
import { useInView } from 'react-intersection-observer';

interface Props {
    ingredients: IIngredientsArray[];
}

export const Tabs = ({ingredients}: Props) => {
    const [current, setCurrent] = React.useState<string>('bun');
    const containerRef = useRef();
    const height = window.innerHeight - 320;

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

    const tmp = [bunRef, mainRef, saucesRef];
    
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
            <div style={{height: `${height}px`, overflowY: 'scroll'}}>
            {
                ingredients.map((el, index) => (
                    <section className={'mt-10'} key={el.header} ref={tmp[index]}>
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
                                        <IngredientCard ingredient={el} />
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
