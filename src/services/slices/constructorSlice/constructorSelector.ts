import { RootState } from '../../../store/store.ts';
import { createSelector } from '@reduxjs/toolkit';

const constructor = (state: RootState) => state.constructorSlice.constructor;

export const getStateConstructor = createSelector(
  [constructor], (constructor) => constructor
);
