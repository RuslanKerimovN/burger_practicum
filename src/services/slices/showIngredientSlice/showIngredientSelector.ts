import { RootState } from '../../../store/store.ts';
import { createSelector } from '@reduxjs/toolkit';

const watchIngredient = (state: RootState) => state.showIngredientSlice.watchIngredient;

export const getStateWatchIngredient = createSelector(
  [watchIngredient], (watchIngredient) => watchIngredient
);
