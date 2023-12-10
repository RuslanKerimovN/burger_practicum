import feedSlice, {
  wsConnectingFeed,
  onOpenFeed,
  onCloseFeed,
  onErrorFeed,
  onMessageFeed,
  ITapeOrderSlice
} from './feedSlice.ts';
import { describe, expect, it } from 'vitest';
import { ITapeOrders, WebSocketStatus } from '../../../types/types.ts';

describe('Testing feedSlice', () => {
  const initialState: ITapeOrderSlice = {
    feedOrders: undefined,
    feedDone: [],
    feedPending: [],
    status: WebSocketStatus.OFFLINE,
    error: ''
  };

  it('feedSlice initialState', () => {
    const result = feedSlice(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('wsConnectingFeed', () => {
    const action = { type: wsConnectingFeed.type };
    const result = feedSlice(initialState, action);
    expect(result).toEqual({ ...initialState, status:  WebSocketStatus.CONNECTING });
  });

  it('onOpenFeed', () => {
    const action = { type: onOpenFeed.type };
    const result = feedSlice(initialState, action);
    expect(result).toEqual({ ...initialState, status:  WebSocketStatus.ONLINE, error: '' });
  });

  it('onCloseFeed', () => {
    const action = { type: onCloseFeed.type };
    const result = feedSlice(initialState, action);
    expect(result).toEqual({ ...initialState, status:  WebSocketStatus.OFFLINE, feedOrders: undefined });
  });

  it('onErrorFeed', () => {
    const action = {
      type: onErrorFeed.type,
      payload: 'error string'
    };
    const result = feedSlice(initialState, action);
    expect(result).toEqual({ ...initialState, error: 'error string' });
  });

  it('onMessageFeed', () => {
    const response: ITapeOrders = {
      success: true,
      orders: [
        {
          ingredients: [],
          _id: '',
          status: 'done',
          number: 0,
          createdAt: '',
          updatedAt: '',
          name: ''
        },
        {
          ingredients: [],
          _id: '',
          status: 'pending',
          number: 0,
          createdAt: '',
          updatedAt: '',
          name: ''
        }
      ],
      total: 0,
      totalToday: 0
    };
    const [done, pending] = response.orders;

    const action = {
      type: onMessageFeed.type,
      payload: response
    };
    const result = feedSlice(initialState, action);
    expect(result).toEqual({
      ...initialState,
      feedOrders: response,
      feedDone: [done],
      feedPending: [pending]
    });
  });
});
