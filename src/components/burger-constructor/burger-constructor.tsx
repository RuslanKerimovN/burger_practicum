import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../data/data";
import { IBurgerIngredients } from "../../types/types";
import { BurgerElement } from "../burger-element/burger-element";
import {
  getTypeBurgerElement,
  getIsActiveBurgerElement,
  getIsPaddingActiveBurgerElement
} from '../../helpers/helpers';
import constructorStyle from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  const menu: IBurgerIngredients[] = data;
  const height = window.innerHeight - 320;
  const heightIngredientsWindow = window.innerHeight - 380;

  return (
      <div className='mt-25 pl-4 pr-4' style={{maxHeight: `${height}px`}}>
        <div 
          style={{overflowY: 'scroll', maxHeight: `${heightIngredientsWindow}px`}} 
          className="mb-10"
        >
          {
            menu.map((el, index) => (
              <div 
                key={el._id} 
                className={`${(index === 0) ? constructorStyle.positionElemFixStart : ''} ${(index === menu.length -1) ? constructorStyle.positionElemFixEnd : ''}`}>
                <BurgerElement 
                  type={getTypeBurgerElement(index, menu)}
                  isLocked={(getTypeBurgerElement(index, menu) === 'top' || getTypeBurgerElement(index, menu) === 'bottom')}
                  name={el.name}
                  price={el.price}
                  img={el.image_mobile}
                  isActive={getIsActiveBurgerElement(index, menu)}
                  isPadding={getIsPaddingActiveBurgerElement(index, menu)}
                />
                {index !== menu.length -1 && <div className="pb-1"/>}
              </div>
            ))
          }
        </div>
        <div className={constructorStyle.order}>
          <p className="text text_type_digits-medium mr-10">
            {610}<CurrencyIcon type="primary" />
          </p>
          <Button htmlType="button" type="primary" size="medium">
            Оформить заказ
          </Button>
        </div>
      </div>
  );
}
