import { RootState } from '../../../store/store.ts';
import { createSelector } from '@reduxjs/toolkit';

const order = (state: RootState) => state.orderSlice.order;
const isLoadingOrder = (state: RootState) => state.orderSlice.isLoadingOrder;
const isErrorOrder = (state: RootState) => state.orderSlice.isErrorOrder;

export const getStateOrder = createSelector(
  [order], (order) => order
);

export const getStateLoadingOrder = createSelector(
  [isLoadingOrder], (isLoadingOrder) => isLoadingOrder
);

export const getStateErrorOrder = createSelector(
  [isErrorOrder], (isErrorOrder) => isErrorOrder
);
