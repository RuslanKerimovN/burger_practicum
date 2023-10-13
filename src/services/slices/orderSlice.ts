import { IOrderResponse } from "../../types/types";
import {baseOrder} from '../../types/baseObjects';
import { createAsyncThunk, createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { postOrderServices } from '../../services/api/services';
import { RootState } from "../../store/store";

interface IOrder {
    order: IOrderResponse,
    isLoadingOrder: boolean,
    isErrorOrder: boolean,
}

const initialState: IOrder = {
    order: baseOrder,
    isLoadingOrder: false,
    isErrorOrder: false,
}

export const postOrder = createAsyncThunk<IOrderResponse, string[]>(
    'postOrder',
    async (array, {rejectWithValue}) => {
        const response = await postOrderServices(array);

        if (!response.ok) {
            return rejectWithValue(true);
        }

        const data = await response.json();
        return data;
    }
)

const orderSlice = createSlice({
    name: 'orderSlice',
    initialState: initialState,
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
            })
    }
});

// export const {
// } = orderSlice.actions;
export default orderSlice.reducer;

const order = (state: RootState) => state.orderSlice.order;
const isLoadingOrder = (state: RootState) => state.orderSlice.isLoadingOrder;
const isErrorOrder = (state: RootState) => state.orderSlice.isErrorOrder;

export const getStateOrder = createSelector(
    [order], order => order
);

export const getStateLoadingOrder = createSelector(
    [isLoadingOrder], isLoadingOrder => isLoadingOrder
);

export const getStateErrorOrder = createSelector(
    [isErrorOrder], isErrorOrder => isErrorOrder
);
