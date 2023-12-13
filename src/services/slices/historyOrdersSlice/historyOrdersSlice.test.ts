import historyOrdersSlice, {
  wsConnectingHistoryOrders,
  onOpenHistoryOrders,
  onCloseHistoryOrders,
  onErrorHistoryOrders,
  onMessageHistoryOrders,
  IHistoryTapeOrderSlice
} from './historyOrdersSlice.ts';
import { describe, expect, it } from 'vitest';
import { ITapeOrders, WebSocketStatus } from '../../../types/types.ts';

describe('Testing historyOrdersSlice', () => {
  const initialState: IHistoryTapeOrderSlice = {
    historyOrders: undefined,
    status: WebSocketStatus.OFFLINE,
    error: ''
  };

  it('historyOrdersSlice initialState', () => {
    const result = historyOrdersSlice(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('wsConnectingHistoryOrders', () => {
    const action = { type: wsConnectingHistoryOrders.type };
    const result = historyOrdersSlice(initialState, action);
    expect(result).toEqual({ ...initialState, status:  WebSocketStatus.CONNECTING });
  });

  it('onOpenHistoryOrders', () => {
    const action = { type: onOpenHistoryOrders.type };
    const result = historyOrdersSlice(initialState, action);
    expect(result).toEqual({
      ...initialState,
      status:  WebSocketStatus.ONLINE,
      error: ''
    });
  });

  it('onCloseHistoryOrders', () => {
    const action = { type: onCloseHistoryOrders.type };
    const result = historyOrdersSlice(initialState, action);
    expect(result).toEqual({
      ...initialState,
      status:  WebSocketStatus.OFFLINE,
      historyOrders: undefined });
  });

  it('onErrorHistoryOrders', () => {
    const action = {
      type: onErrorHistoryOrders.type,
      payload: 'error string'
    };
    const result = historyOrdersSlice(initialState, action);
    expect(result).toEqual({ ...initialState, error: 'error string' });
  });

  it('onMessageHistoryOrders', () => {
    const response: ITapeOrders = {
      success: true,
      orders: [],
      total: 0,
      totalToday: 0
    };

    const action = {
      type: onMessageHistoryOrders.type,
      payload: response
    };
    const result = historyOrdersSlice(initialState, action);
    expect(result).toEqual({ ...initialState, historyOrders: response });
  });
});
