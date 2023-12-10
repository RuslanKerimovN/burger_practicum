import { IOrders, ITapeOrders, WebSocketStatus } from '../../../types/types.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITapeOrderSlice {
  feedOrders: ITapeOrders | undefined;
  feedDone: IOrders[];
  feedPending: IOrders[];
  status: WebSocketStatus;
  error: string;
}

const initialState: ITapeOrderSlice = {
  feedOrders: undefined,
  feedDone: [],
  feedPending: [],
  status: WebSocketStatus.OFFLINE,
  error: ''
};

export const feedSlice = createSlice({
  name: 'feedSlice',
  initialState,
  reducers: {
    wsConnectingFeed(state) {
      state.status = WebSocketStatus.CONNECTING;
    },
    onOpenFeed(state) {
      state.status = WebSocketStatus.ONLINE;
      state.error = '';
    },
    onCloseFeed(state) {
      state.status = WebSocketStatus.OFFLINE;
      state.feedOrders = undefined;
    },
    onErrorFeed(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    onMessageFeed(state, action: PayloadAction<ITapeOrders>) {
      state.feedOrders = action.payload;
      state.feedDone = action.payload.orders.filter((el) => el.status === 'done');
      state.feedPending = action.payload.orders.filter((el) => el.status === 'pending');
    }
  }
});

export const {
  wsConnectingFeed,
  onOpenFeed,
  onCloseFeed,
  onErrorFeed,
  onMessageFeed
} = feedSlice.actions;

export default feedSlice.reducer;
