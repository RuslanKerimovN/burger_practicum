import orderSlice, { IOrder, postOrder } from './orderSlice.ts';
import { describe, expect, it, vi } from 'vitest';
import { getMockRequests } from '../../../helpers/testHelpers.ts';
import { baseOrder } from '../../../types/baseObjects.ts';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../constants/constants.ts';
import { deleteCookie, setCookie } from '../../../helpers/helpers.ts';

describe('Testing orderSlice', () => {
  const initialState: IOrder = {
    order: baseOrder,
    isLoadingOrder: false,
    isErrorOrder: false
  };
  const response = {
    name: '',
    order: {
      number: 0
    },
    success: false
  };

  it('orderSlice initialState', () => {
    const result = orderSlice(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should orderSlice request fulfilled', async () => {
    const fetchMock = getMockRequests({
      ok: true,
      json: () => Promise.resolve(response)
    });
    vi.stubGlobal('fetch', fetchMock);

    localStorage.setItem(REFRESH_TOKEN, '123');
    setCookie(ACCESS_TOKEN, '123');

    const dispatch = vi.fn();
    const thunk = postOrder([]);
    await thunk(dispatch, () => {}, {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('postOrder/pending');
    expect(end[0].type).toBe('postOrder/fulfilled');
    expect(end[0].payload).toEqual(response);

    localStorage.removeItem(REFRESH_TOKEN);
    deleteCookie(ACCESS_TOKEN);
  });

  it('should orderSlice request rejected', async () => {
    const fetchMock = getMockRequests({ ok: false });
    vi.stubGlobal('fetch', fetchMock);

    const dispatch = vi.fn();
    const thunk = postOrder([]);
    await thunk(dispatch, () => {}, {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('postOrder/pending');
    expect(end[0].type).toBe('postOrder/rejected');
    expect(end[0].payload).toEqual(true);
  });

  it('should orderSlice extraReducers pending', () => {
    const action = { type: postOrder.pending.type };
    const state = orderSlice(initialState, action);
    expect(state).toEqual({ ...initialState, isLoadingOrder: true });
  });

  it('should orderSlice extraReducers fulfilled', () => {
    const action = {
      type: postOrder.fulfilled.type,
      payload: response
    };
    const state = orderSlice(initialState, action);
    expect(state).toEqual({ ...initialState, order: response });
  });

  it('should orderSlice extraReducers rejected', () => {
    const action = { type: postOrder.rejected.type };
    const state = orderSlice(initialState, action);
    expect(state).toEqual({ ...initialState, isErrorOrder: true });
  });
});
