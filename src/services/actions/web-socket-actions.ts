import { createAction } from '@reduxjs/toolkit';
import {
  onCloseFeed,
  onErrorFeed,
  onMessageFeed,
  onOpenFeed,
  wsConnectingFeed
} from '../slices/feedSlice/feedSlice.ts';
import { IwsActionTypes } from '../../types/types.ts';
import {
  onCloseHistoryOrders,
  onErrorHistoryOrders,
  onMessageHistoryOrders,
  onOpenHistoryOrders,
  wsConnectingHistoryOrders
} from '../slices/historyOrdersSlice/historyOrdersSlice.ts';

export const connect = createAction<string, 'LIVE_TABLE_CONNECT'>('LIVE_TABLE_CONNECT');
export const disconnect = createAction('LIVE_TABLE_DISCONNECT');

export const wsActionsFeed: IwsActionTypes = {
  wsConnect: connect,
  wsDisconnect: disconnect,
  wsConnecting: wsConnectingFeed,

  onOpen: onOpenFeed,
  onClose: onCloseFeed,
  onError: onErrorFeed,
  onMessage: onMessageFeed
};

export const wsActionsHistoryOrders: IwsActionTypes = {
  wsConnect: connect,
  wsDisconnect: disconnect,
  wsConnecting: wsConnectingHistoryOrders,

  onOpen: onOpenHistoryOrders,
  onClose: onCloseHistoryOrders,
  onError: onErrorHistoryOrders,
  onMessage: onMessageHistoryOrders
};
