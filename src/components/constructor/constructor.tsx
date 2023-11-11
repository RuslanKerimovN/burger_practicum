import { useCallback, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getStateConstructor, moveIngredientInConstructor } from "../../services/slices/constructorSlice";
import { IBurgerIngredients } from "../../types/types";
import update from 'immutability-helper';
import { BurgerElement } from "../burger-element/burger-element";
import { CONSTRUCTOR_INGREDIENTS_ARRAY } from "../../constants/constants";

export const Constructor = () => {
  const dispatch = useAppDispatch();
  const [, drop] = useDrop(() => ({ accept: 'constructor' }));
  const constructor = useAppSelector(getStateConstructor);
  const [ingredient, setIngredient] = useState<IBurgerIngredients[]>([]);
  
  useEffect(() => {
    setIngredient(constructor);
  }, [constructor]);
  
  useEffect(() => {
    dispatch(moveIngredientInConstructor(ingredient));
  }, [ingredient]);
  
  const moveIngredient = useCallback((dragIndex: number, hoverIndex: number) => {
    setIngredient((prevCards: IBurgerIngredients[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as IBurgerIngredients]
        ]
      })
    );
  }, []);
  
  const renderCard = useCallback(
    (ingredient: IBurgerIngredients, index: number) => {
      return (
        <div key={ingredient.constructorId}>
          <BurgerElement
            isLocked={false}
            ingredient={ingredient}
            index={index}
            deleteId={ingredient._id}
            id={ingredient.constructorId}
            moveIngredient={moveIngredient}
          />
          {index !== constructor.length - 1 && <div className="pb-1"/>}
        </div>
      );
    },
    []
  );
  
  return(
    <div 
      style={{ maxHeight: `${CONSTRUCTOR_INGREDIENTS_ARRAY}px`, overflow: 'auto' }} 
      className="mb-1"
      ref={drop}
    >
      {constructor.map((ingredient, index) => ingredient.type !== 'bun' && renderCard(ingredient, index))}
    </div>
  );
};
