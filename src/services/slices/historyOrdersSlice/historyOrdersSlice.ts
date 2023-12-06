import { ITapeOrders, WebSocketStatus } from '../../../types/types.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ITapeOrderSlice {
  historyOrders: ITapeOrders | undefined;
  status: WebSocketStatus;
  error: string;
}

const initialState: ITapeOrderSlice = {
  historyOrders: undefined,
  status: WebSocketStatus.OFFLINE,
  error: ''
};

export const historyOrdersSlice = createSlice({
  name: 'historyOrdersSlice',
  initialState,
  reducers: {
    wsConnectingHistoryOrders(state) {
      state.status = WebSocketStatus.CONNECTING;
    },
    onOpenHistoryOrders(state) {
      state.status = WebSocketStatus.ONLINE;
      state.error = '';
    },
    onCloseHistoryOrders(state) {
      state.status = WebSocketStatus.OFFLINE;
    },
    onErrorHistoryOrders(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    onMessageHistoryOrders(state, action: PayloadAction<ITapeOrders>) {
      state.historyOrders = action.payload;
    }
  }
});

export const {
  wsConnectingHistoryOrders,
  onOpenHistoryOrders,
  onCloseHistoryOrders,
  onErrorHistoryOrders,
  onMessageHistoryOrders
} = historyOrdersSlice.actions;

export default historyOrdersSlice.reducer;
