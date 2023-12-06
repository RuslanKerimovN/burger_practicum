import { IBurgerIngredients } from '../../../types/types.ts';
import { baseIngredient } from '../../../types/baseObjects.ts';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IShowIngredient {
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
    },
    deleteWatchIngredient(state) {
      state.watchIngredient = baseIngredient;
    }
  }
});

export const {
  saveWatchIngredient,
  deleteWatchIngredient
} = showIngredientSlice.actions;

export default showIngredientSlice.reducer;
