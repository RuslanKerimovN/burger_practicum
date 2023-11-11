import { IBurgerIngredients } from "../../types/types";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface IConstructor {
    constructor: IBurgerIngredients[];
}

const initialState: IConstructor = {
  constructor: []
};

const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState: initialState,
  reducers: {
    addIngredientInConstructor(state, action: PayloadAction<{ingredient: IBurgerIngredients, uniqId: string}>) {
      const { ingredient, uniqId } = action.payload;
      if (ingredient.type !== 'bun') {
        state.constructor.push({ ...ingredient, constructorId: uniqId });
        return;
      }
            
      const bunIndex = state.constructor.findIndex((el) => el.type === 'bun');
      if (bunIndex === -1) {
        state.constructor.push({ ...ingredient, constructorId: uniqId });
      } else {
        state.constructor.splice(bunIndex, 1, { ...ingredient, constructorId: uniqId });
      }
    },
    deleteIngredientFromConstructor(state, action: PayloadAction<string>) {
      const index = state.constructor.findIndex((el) => el._id === action.payload);
      if (index >= 0) {
        state.constructor.splice(index, 1);
      }
    },
    moveIngredientInConstructor(state, action: PayloadAction<IBurgerIngredients[]>) {
      state.constructor = action.payload;
    }
  }
});

export const {
  addIngredientInConstructor,
  deleteIngredientFromConstructor,
  moveIngredientInConstructor
} = constructorSlice.actions;
export default constructorSlice.reducer;

const constructor = (state: RootState) => state.constructorSlice.constructor;

export const getStateConstructor = createSelector(
  [constructor], constructor => constructor
);
