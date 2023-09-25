import appStyle from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';

export const App = () => {
  return (
    <div>
      <AppHeader/>
      <main className={`${appStyle.content}`}>
        <div className={`${appStyle.ingredients}`}>
          <BurgerIngredients />
        </div>
        <div className={`${appStyle.constructor}`}>
          <BurgerConstructor />
        </div>
      </main>
    </div>
  );
}
