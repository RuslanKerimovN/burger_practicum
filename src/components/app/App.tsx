import React from 'react';
import appStyle from './App.module.css';
import {AppHeader} from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';

export const App = () => {
  return (
    <div>
      <AppHeader/>
      <main className={appStyle.content}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}
