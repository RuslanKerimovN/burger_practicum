import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IBurgerIngredients } from "../../types/types";
import { BurgerElement } from "../burger-element/burger-element";
import constructorStyle from './burger-constructor.module.css';
import { useMemo, useState } from "react";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";

interface Props {
  ingredients: IBurgerIngredients[];
}

export const BurgerConstructor = ({ingredients}: Props) => {
  const [isModalShow, setIsModalShow] = useState<boolean>(false);

  const openModal = () => {
    setIsModalShow(true);
  }

  const closeModal = () => {
    setIsModalShow(false);
  }

  //временные вычисления с захардкоженными данными
  const buns: IBurgerIngredients[] = ingredients.filter((el) => el.type === 'bun');
  const bun = buns.find((el) => el.type === 'bun');
  const arrayWithoutBun: IBurgerIngredients[] = ingredients.filter((el) => el.type !== 'bun');
  ////////////////////////////////////////////////

  let price: number = useMemo(() => {
    let price: number = 0;

    for(let i = 0; i < arrayWithoutBun.length; i++) {
      price += arrayWithoutBun[i].price;
    }
    return price + ((bun) ? (bun.price * 2) : 0);
  }, [ingredients]);

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
            style={{maxHeight: `${heightIngredientsWindow}px`, overflow: 'auto'}} 
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
                    />
                    {index !== ingredients.length - 1 && <div className="pb-1"/>}
                    
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
          {price}<CurrencyIcon type="primary" />
        </p>

        <Button htmlType="button" type="primary" size="medium"  onClick={openModal}>
          Оформить заказ
        </Button>

        {isModalShow && 
          <Modal header={''} closeModal={closeModal} >
            <OrderDetails id={'034536'}/>
          </Modal>
        }
      </div>
    </div>
  );
}
