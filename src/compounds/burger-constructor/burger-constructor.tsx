import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyle from './burger-constructor.module.css';
import { useEffect, useState } from 'react';
import { Modal } from '../../components/modal/modal.tsx';
import { OrderDetails } from '../../components/order-details/order-details.tsx';
import { useModal } from '../../hooks/useModal.tsx';
import { useAppSelector } from '../../hooks/useAppSelector.tsx';
import { useDrop } from 'react-dnd';
import { Constructor } from '../../components/constructor/constructor.tsx';
import { IBurgerIngredients } from '../../types/types.ts';
import { ACCESS_TOKEN, CONSTRUCTOR_HEIGHT, REFRESH_TOKEN } from '../../constants/constants.ts';
import { getCookie } from '../../helpers/helpers.ts';
import { useNavigate } from 'react-router';
import { LOGIN } from '../../constants/path.ts';
import { getStateConstructor } from '../../services/slices/constructorSlice/constructorSelector.ts';

export const BurgerConstructor = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const constructor = useAppSelector(getStateConstructor);
  const [requestParams, setRequestParams] = useState<string[]>([]);
  const [renderPrice, setRenderPrice] = useState<number>(0);
  const [bun, setBun] = useState<IBurgerIngredients | undefined>(undefined);
  const navigate = useNavigate();

  const onPressButton = (): void => {
    const cookie = getCookie(ACCESS_TOKEN);
    const token = localStorage.getItem(REFRESH_TOKEN);

    if (!cookie || !token) {
      navigate(LOGIN);
      return;
    }
    openModal();
  };

  const [, drop] = useDrop(() => ({
    accept: 'ingredient',
    drop: () => ({ name: 'BurgerConstructor' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }));

  useEffect(() => {
    let price: number = 0;
    let ids: string[] = [];
    const bunTmp = constructor.find((el: IBurgerIngredients) => el.type === 'bun');
    for (let i = 0; i < constructor.length; i++) {
      price += constructor[i].price;
      ids = [...ids, constructor[i]._id];
    }

    setRequestParams(ids);
    setRenderPrice(bunTmp ? price + bunTmp.price : price);
    setBun(bunTmp);
  }, [constructor]);

  return (
    <div
      data-testId='drop_zone'
      ref={drop}
      className='mt-25 pl-4 pr-4'
      style={{ maxHeight: `${CONSTRUCTOR_HEIGHT}px` }}
    >
      <>
        <div className="pl-6 mb-1">
          <ConstructorElement
            type={'top'}
            isLocked={true}
            text={bun?.name || 'Выберите самую вкусную булку во всей галактике (верх)'}
            price={bun?.price || 0}
            thumbnail={bun?.image_mobile || 'https://www.svgrepo.com/show/286913/close-error.svg'}
          />
        </div>

        <Constructor />

        <div  className="pl-6 mb-10">
          <ConstructorElement
            type={'bottom'}
            isLocked={true}
            text={bun?.name || 'Выберите самую вкусную булку во всей галактике (низ)'}
            price={bun?.price || 0}
            thumbnail={bun?.image_mobile || 'https://www.svgrepo.com/show/286913/close-error.svg'}
          />
        </div>
      </>

      <div className={constructorStyle.order}>
        <p className="text text_type_digits-medium mr-10">
          {renderPrice}<CurrencyIcon type="primary" />
        </p>

        <Button
          data-testId='make_order'
          htmlType="button"
          type="primary"
          size="medium"
          onClick={onPressButton} disabled={!bun}
        >
          Оформить заказ
        </Button>

        {
          isModalOpen &&
            <Modal closeModal={closeModal} >
              <OrderDetails ids={requestParams}/>
            </Modal>
        }
      </div>
    </div>
  );
};
