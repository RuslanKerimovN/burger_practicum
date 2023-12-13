import { RootState } from '../../../store/store.ts';
import { createSelector } from '@reduxjs/toolkit';

const ingredients = (state: RootState) => state.ingredientsSlice.ingredients;
const isLoadingIngredients = (state: RootState) => state.ingredientsSlice.isLoadingIngredients;
const isErrorIngredients = (state: RootState) => state.ingredientsSlice.isErrorIngredients;

export const getStateIngredients = createSelector(
  [ingredients], (ingredients) => ingredients
);

export const getStateLoadingIngredients = createSelector(
  [isLoadingIngredients], (isLoadingIngredients) => isLoadingIngredients
);

export const getStateErrorIngredients = createSelector(
  [isErrorIngredients], (isErrorIngredients) => isErrorIngredients
);
