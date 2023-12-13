import { RootState } from '../../../store/store.ts';
import { createSelector } from '@reduxjs/toolkit';

const orderInfo = (state: RootState) => state.orderInfoSlice.orderInfo;
const isLoadingOrderInfo = (state: RootState) => state.orderInfoSlice.isLoadingOrderInfo;
const isErrorOrderInfo = (state: RootState) => state.orderInfoSlice.isErrorOrderInfo;

export const getStateOrderInfo = createSelector(
  [orderInfo], (orderInfo) => orderInfo
);

export const getStateLoadingOrderInfo = createSelector(
  [isLoadingOrderInfo], (isLoadingOrderInfo) => isLoadingOrderInfo
);

export const getStateErrorOrderInfo = createSelector(
  [isErrorOrderInfo], (isErrorOrderInfo) => isErrorOrderInfo
);
