import { IOrderResponse } from '../../types/types';
import { baseOrder } from '../../types/baseObjects';
import { createAsyncThunk, createSelector, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { postOrderServices, postUpdateTokenService } from '../api/services.ts';
import { RootState } from '../../store/store';
import { getCookie, setCookie } from '../../helpers/helpers.ts';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants/constants.ts';

interface IOrder {
    order: IOrderResponse,
    isLoadingOrder: boolean,
    isErrorOrder: boolean,
}

const initialState: IOrder = {
  order: baseOrder,
  isLoadingOrder: false,
  isErrorOrder: false
};

export const postOrder = createAsyncThunk<IOrderResponse, string[]>(
  'postOrder',
  async (array, { rejectWithValue }) => {
    let cookie = getCookie(ACCESS_TOKEN);
    const token = localStorage.getItem(REFRESH_TOKEN);
    let response;

    if (!cookie || !token) {
      return rejectWithValue(true);
    }

    response = await postOrderServices(cookie, array);
    if (response.ok) {
      return response.json();
    }

    const tmp = await response.json();

    if (tmp && tmp.message === 'jwt expired') {
      const res = await postUpdateTokenService(token);
      if (!res.ok) {
        return rejectWithValue(true);
      }

      const tmp = await res.json();
      await localStorage.setItem(REFRESH_TOKEN, `${(tmp.refreshToken)}`);
      await setCookie(ACCESS_TOKEN, `${(tmp.accessToken).split('Bearer ')[1]}`);
    } else {
      return await response.json();
    }

    cookie = await getCookie(ACCESS_TOKEN);
    if (!cookie) {
      return rejectWithValue(true);
    }

    response = await postOrderServices(cookie, array);
    if (!response.ok) {
      return rejectWithValue(true);
    }

    return await response.json();
  }
);

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.isLoadingOrder = false;
        state.isErrorOrder = false;
      })
      .addMatcher(isAnyOf(postOrder.pending), (state) => {
        state.isLoadingOrder = true;
        state.isErrorOrder = false;
      })
      .addMatcher(isAnyOf(postOrder.rejected), (state) => {
        state.isLoadingOrder = false;
        state.isErrorOrder = true;
      });
  }
});

export default orderSlice.reducer;

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
