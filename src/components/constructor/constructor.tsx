import { useCallback, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { moveIngredientInConstructor } from "../../services/slices/restaurantSlice";
import { IBurgerIngredients } from "../../types/types";
import update from 'immutability-helper';
import { BurgerElement } from "../burger-element/burger-element";

export const Constructor = () => {
    const dispatch = useAppDispatch();
    const [, drop] = useDrop(() => ({ accept: 'constructor' }));
    const {constructor} = useAppSelector(state => state.restaurantSlice);
    const [ingredient, setIngredient] = useState<IBurgerIngredients[]>([]);
    const heightIngredientsWindow = window.innerHeight - 550;
  
    useEffect(() => {
      setIngredient(constructor);
    }, [constructor]);
  
    useEffect(() => {
      dispatch(moveIngredientInConstructor(ingredient));
    }, [ingredient])
  
    const moveIngredient = useCallback((dragIndex: number, hoverIndex: number) => {
      setIngredient((prevCards: IBurgerIngredients[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as IBurgerIngredients],
          ],
        }),
      )
    }, [])
  
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
        )
      },
      [],
    )
  
    return(
    <div 
            style={{maxHeight: `${heightIngredientsWindow}px`, overflow: 'auto'}} 
            className="mb-1"
            ref={drop}
        >
            {constructor.map((ingredient, index) => ingredient.type !== 'bun' && renderCard(ingredient, index))}
        </div>
    )
}