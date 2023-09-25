import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../data/data";
import { IBurgerIngredients } from "../../types/types";
import { BurgerElement } from "../burger-element/burger-element";
import {
  getIsActiveBurgerElement,
  getIsPaddingActiveBurgerElement
} from '../../helpers/helpers';
import constructorStyle from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  const menu: IBurgerIngredients[] = data;
  
  //временные вычисления с захардкоженными данными
  const arrayOneBut = menu.filter((el) => el._id !== '60666c42cc7b410027a1a9b2');
  const bun = arrayOneBut.find((el) => el.type === 'bun');
  const arrayWithoutBun = data.filter((el) => el.type !== 'bun');
  ////////////////////////////////////////////////

  const height = window.innerHeight - 320;
  const heightIngredientsWindow = window.innerHeight - 550;

  return (
    <div className='mt-25 pl-4 pr-4' style={{maxHeight: `${height}px`}}>
      {bun &&
        <>
          <div className="pl-6 mb-1">
            <ConstructorElement
              type={'top'}
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image_mobile}
            />
          </div>
          <div 
            style={{overflowY: 'scroll', maxHeight: `${heightIngredientsWindow}px`}} 
            className="mb-1"
          >
            {
              arrayWithoutBun.map((el, index) => {
                return (
                  <div key={el._id}>
                    <BurgerElement
                      isLocked={false}
                      name={el.name}
                      price={el.price}
                      img={el.image_mobile}
                      isActive={getIsActiveBurgerElement(index, menu)}
                      isPadding={getIsPaddingActiveBurgerElement(index, menu)}
                    />
                    {index !== menu.length -1 && <div className="pb-1"/>}
                  </div>
                )})
            }
          </div>
          <div  className="pl-6 mb-10">
            <ConstructorElement
              type={'bottom'}
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image_mobile}
            />
          </div>
        </>
      }
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
