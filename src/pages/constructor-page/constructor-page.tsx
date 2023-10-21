import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import appStyle from './constructor-page.module.css';

export const ConstructorPage = () => {
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
    )
}