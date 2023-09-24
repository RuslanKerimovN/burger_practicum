import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import tabsStyle from './tabs.module.css';

interface Props {
    setIngredientType: (type: string) => void;
}

export const Tabs = ({setIngredientType}: Props) => {
    const [current, setCurrent] = React.useState<string>('bun');

    const onTabClick = (value: string) => {
        setCurrent(value);
        setIngredientType(value);
    }

    return (
        <div className={`${tabsStyle.tabs}`}>
            <Tab value="bun" active={current === 'bun'} onClick={onTabClick}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={onTabClick}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={onTabClick}>
                Начинки
            </Tab>
        </div>
    )
};
