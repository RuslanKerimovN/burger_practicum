import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import elementStyle from './burger-element.module.css';
import { IBurgerIngredients } from '../../types/types';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { deleteIngredientFromConstructor } from '../../services/slices/restaurantSlice';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import type { Identifier, XYCoord } from 'dnd-core';

interface Props {
    isLocked: boolean;
    ingredient: IBurgerIngredients;
    deleteId: string;
    id: string;
    index: number;
    moveIngredient: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
    index: number
    id: string
    type: string
  }

export const BurgerElement = ({isLocked, ingredient, id, moveIngredient, index, deleteId}: Props) => {
  const dispatch = useAppDispatch();
  const {name, price, image_mobile} = ingredient;
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
      accept: 'constructor',
      collect(monitor) {
      return {
          handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  })

  const [, drag] = useDrag({
    type: 'constructor',
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref));
  
  return (
      <div ref={ref} className={`${elementStyle.element}`}>
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={isLocked}
            text={name}
            price={price}
            thumbnail={image_mobile}
            handleClose={() => dispatch(deleteIngredientFromConstructor(deleteId))}
          />
      </div>
  );
}
