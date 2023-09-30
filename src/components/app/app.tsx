import appStyle from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { useEffect, useState } from 'react';
import { IBurgerIngredients } from '../../types/types';
import { getIngredients } from '../srvices/services';

export const App = () => {
  const [ingredients, setIngredients] = useState<IBurgerIngredients[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await getIngredients();
      await setIngredients(response);
    }
    getData();
  }, []);

  return (
    <div>
      <AppHeader/>
      <main className={`${appStyle.content}`}>
        <div className={`${appStyle.ingredients}`}>
          <BurgerIngredients ingredients={ingredients}/>
        </div>
        <div className={`${appStyle.constructor}`}>
          <BurgerConstructor ingredients={ingredients}/>
        </div>
      </main>
    </div>
  );
}
