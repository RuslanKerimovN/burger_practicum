import { useLocation } from 'react-router';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import appStyle from './constructor-page.module.css';

export const ConstructorPage = () => {
  const location = useLocation();
  localStorage.setItem('noLogin', `${location.pathname}`);

  return (
    <>
      <main className={`${appStyle.content}`}>
        <div className={`${appStyle.ingredients}`}>
          <BurgerIngredients/>
        </div>
        <div className={`${appStyle.constructor}`}>
          <BurgerConstructor/>
        </div>
      </main>
    </>
  );
};
