import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IBurgerIngredients, IOrderResponse, baseOrder } from "../../types/types";
import { BurgerElement } from "../burger-element/burger-element";
import constructorStyle from './burger-constructor.module.css';
import { useContext, useMemo, useState } from "react";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { useModal } from "../../hooks/useModal";
import { Context } from "../../context/context";
import { postOrder } from "../services/services";

export const BurgerConstructor = () => {
  const {isModalOpen, openModal, closeModal} = useModal();
  const [order, setOrder] = useState<IOrderResponse>(baseOrder);
  const ingredients = useContext(Context);

  //временные вычисления с захардкоженными данными
  const buns: IBurgerIngredients[] = ingredients.filter((el) => el.type === 'bun');
  const bun = buns.find((el) => el.type === 'bun');
  const arrayWithoutBun: IBurgerIngredients[] = ingredients.filter((el) => el.type !== 'bun');
  const oneBunArray = bun ? [...arrayWithoutBun, bun] : [];
  const ids = oneBunArray.map((el) => {return el._id});
  ////////////////////////////////////////////////

  let price: number = useMemo(() => {
    let price: number = 0;

    for(let i = 0; i < oneBunArray.length - 1; i++) {
      price += oneBunArray[i].price;
    }
    return bun ? price + oneBunArray[oneBunArray.length - 1].price * 2 : 0;
  }, [ingredients]);

  const height = window.innerHeight - 320;
  const heightIngredientsWindow = window.innerHeight - 550;

  const onButtonClick = async (orderIds: string[]) => {
    let checker: boolean = false;

    await postOrder(orderIds)
      .then((res) => {
        setOrder(res);
        checker = true;
      })
      .catch((res) => console.log(res));
    if (checker) openModal();
  }

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
      {/* ingredients временно, пока не появится реальный заказ */}

      {ingredients.length ?
        <div className={constructorStyle.order}>
          <p className="text text_type_digits-medium mr-10">
            {price}<CurrencyIcon type="primary" />
          </p>

          <Button htmlType="button" type="primary" size="medium"  onClick={() => onButtonClick(ids)}>
            Оформить заказ
          </Button>

          {isModalOpen && 
            <Modal header={''} closeModal={closeModal} >
              <OrderDetails id={`${order.order.number}`}/>
            </Modal>
          }
        </div>
        : <></>
      }
    </div>
  );
}
