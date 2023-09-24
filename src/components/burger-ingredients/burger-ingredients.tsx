import React from 'react';
import { Tabs } from '../tabs/tabs';
import { TabPage } from '../tab-page.jsx/tab-page';

export const BurgerIngredients = () => {
    const [ingredientType, setIngredientType] = React.useState<string>('bun');
    const height = window.innerHeight - 320;
    
    return (
        <section className='mt-10 mr-5 ml-5' style={{maxWidth: '600px'}}>
            <p className="text text_type_main-large mb-5">
                Соберите бургер
            </p>
            <Tabs setIngredientType={setIngredientType}/>
            <div style={{height: `${height}px`, overflowY: 'scroll'}}>
                {ingredientType === 'bun' && <TabPage type1={'bun'} type2={'main'} type3={'sauce'}/>}
                {ingredientType === 'sauce' && <TabPage type1={'sauce'} type2={'bun'} type3={'main'}/>}
                {ingredientType === 'main' && <TabPage type1={'main'} type2={'bun'} type3={'sauce'}/>}
            </div>
        </section>
    );
}
