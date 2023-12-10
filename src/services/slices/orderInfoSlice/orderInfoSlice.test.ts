import orderInfoSlice, { IOrderInfo, getOrderInfo } from './orderInfoSlice.ts';
import { describe, expect, it, vi } from 'vitest';
import { getMockRequests } from '../../../helpers/testHelpers.ts';
import { baseOrderInfo } from '../../../types/baseObjects.ts';

describe('Testing logoutSlice', () => {
  const initialState: IOrderInfo = {
    orderInfo: baseOrderInfo,
    isLoadingOrderInfo: false,
    isErrorOrderInfo: false
  };
  const response = {
    orders: [{
      ingredients: [],
      _id: '',
      status: '',
      number: 0,
      createdAt: '',
      updatedAt: '',
      name: ''
    }],
    success: true
  };

  it('orderInfoSlice initialState', () => {
    const result = orderInfoSlice(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should orderInfoSlice request fulfilled', async () => {
    const fetchMock = getMockRequests({
      ok: true,
      json: () => Promise.resolve(response)
    });
    vi.stubGlobal('fetch', fetchMock);

    const dispatch = vi.fn();
    const thunk = getOrderInfo('');
    await thunk(dispatch, () => {}, {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('getOrderInfo/pending');
    expect(end[0].type).toBe('getOrderInfo/fulfilled');
    expect(end[0].payload).toEqual(response);
  });

  it('should orderInfoSlice request rejected', async () => {
    const fetchMock = getMockRequests({ ok: false });
    vi.stubGlobal('fetch', fetchMock);

    const dispatch = vi.fn();
    const thunk = getOrderInfo('');
    await thunk(dispatch, () => {}, {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('getOrderInfo/pending');
    expect(end[0].type).toBe('getOrderInfo/rejected');
    expect(end[0].payload).toEqual(true);
  });

  it('should orderInfoSlice extraReducers pending', () => {
    const action = { type: getOrderInfo.pending.type };
    const state = orderInfoSlice(initialState, action);
    expect(state).toEqual({ ...initialState, isLoadingOrderInfo: true });
  });

  it('should orderInfoSlice extraReducers fulfilled', () => {
    const action = {
      type: getOrderInfo.fulfilled.type,
      payload: response
    };
    const state = orderInfoSlice(initialState, action);
    expect(state).toEqual({ ...initialState, orderInfo: response.orders[0] });
  });

  it('should orderInfoSlice extraReducers rejected', () => {
    const action = { type: getOrderInfo.rejected.type };
    const state = orderInfoSlice(initialState, action);
    expect(state).toEqual({ ...initialState, isErrorOrderInfo: true });
  });
});
