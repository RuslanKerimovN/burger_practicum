import { IOrders } from '../../types/types';
import { createAsyncThunk, createSelector, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getOrderInfoService } from '../api/services.ts';
import { RootState } from '../../store/store';
import { baseOrderInfo } from '../../types/baseObjects.ts';

export interface IOrderInfo {
  orderInfo: IOrders;
  isLoadingOrderInfo: boolean;
  isErrorOrderInfo: boolean;
}

const initialState: IOrderInfo = {
  orderInfo: baseOrderInfo,
  isLoadingOrderInfo: false,
  isErrorOrderInfo: false
};

export const getOrderInfo = createAsyncThunk<{orders: IOrders[], success: boolean}, string>(
  'getOrderInfo',
  async (orderNum, { rejectWithValue }) => {
    const response = await getOrderInfoService(orderNum);

    if (!response.ok) {
      return rejectWithValue(true);
    }

    return await response.json();
  }
);

const orderInfoSlice = createSlice({
  name: 'orderInfoSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderInfo.fulfilled, (state, action) => {
        state.orderInfo = action.payload.orders[0];
        state.isLoadingOrderInfo = false;
        state.isErrorOrderInfo = false;
      })
      .addMatcher(isAnyOf(getOrderInfo.pending), (state) => {
        state.isLoadingOrderInfo = true;
        state.isErrorOrderInfo = false;
      })
      .addMatcher(isAnyOf(getOrderInfo.rejected), (state) => {
        state.isLoadingOrderInfo = false;
        state.isErrorOrderInfo = true;
      });
  }
});

export default orderInfoSlice.reducer;

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
