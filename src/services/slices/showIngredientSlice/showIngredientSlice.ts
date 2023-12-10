import { IBurgerIngredients } from '../../../types/types.ts';
import { baseIngredient } from '../../../types/baseObjects.ts';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IShowIngredient {
    watchIngredient: IBurgerIngredients,
}

const initialState: IShowIngredient = {
  watchIngredient: baseIngredient
};

const showIngredientSlice = createSlice({
  name: 'showIngredientSlice',
  initialState,
  reducers: {
    saveWatchIngredient(state, action: PayloadAction<IBurgerIngredients>) {
      state.watchIngredient = action.payload;
    }
  }
});

export const {
  saveWatchIngredient
} = showIngredientSlice.actions;

export default showIngredientSlice.reducer;
