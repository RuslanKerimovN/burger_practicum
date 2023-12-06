import { IOrders } from '../../../types/types.ts';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getOrderInfoService } from '../../api/services.ts';
import { baseOrderInfo } from '../../../types/baseObjects.ts';

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
