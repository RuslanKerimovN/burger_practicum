import { useLocation } from 'react-router';
import { BurgerConstructor } from '../../composed/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../../composed/burger-ingredients/burger-ingredients';
import appStyle from './constructor-page.module.css';

export const ConstructorPage = () => {
  const location = useLocation();
  localStorage.setItem('noLogin', `${location.pathname}`);

  return (
    <>
      <div className={`${appStyle.content}`}>
        <div className={`${appStyle.ingredients}`}>
          <BurgerIngredients/>
        </div>
        <div className={`${appStyle.constructor}`}>
          <BurgerConstructor/>
        </div>
      </div>
    </>
  );
};
