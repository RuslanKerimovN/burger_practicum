import logoutSlice, { ILogout, postLogout } from './logoutSlice.ts';
import { describe, expect, it, vi } from 'vitest';
import { getMockRequests } from '../../../helpers/testHelpers.ts';
import { baseLogout } from '../../../types/baseObjects.ts';
import { ILogoutResponse } from '../../../types/types.ts';

describe('Testing logoutSlice', () => {
  const initialState: ILogout = {
    logout: baseLogout,
    isLogoutLoading: false,
    isLogoutError: false
  };
  const response: ILogoutResponse = { success: true, message: 'message' };

  it('logoutSlice initialState', () => {
    const result = logoutSlice(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should logoutSlice request fulfilled', async () => {
    const fetchMock = getMockRequests({
      ok: true,
      json: () => Promise.resolve(response)
    });
    vi.stubGlobal('fetch', fetchMock);

    const dispatch = vi.fn();
    const thunk = postLogout('');
    await thunk(dispatch, () => {}, {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('postLogout/pending');
    expect(end[0].type).toBe('postLogout/fulfilled');
    expect(end[0].payload).toEqual(response);
  });

  it('should logoutSlice request rejected', async () => {
    const fetchMock = getMockRequests({ ok: false });
    vi.stubGlobal('fetch', fetchMock);

    const dispatch = vi.fn();
    const thunk = postLogout('');
    await thunk(dispatch, () => {}, {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('postLogout/pending');
    expect(end[0].type).toBe('postLogout/rejected');
    expect(end[0].payload).toEqual(true);
  });

  it('should logoutSlice extraReducers pending', () => {
    const action = { type: postLogout.pending.type };
    const state = logoutSlice(initialState, action);
    expect(state).toEqual({ ...initialState, isLogoutLoading: true });
  });

  it('should logoutSlice extraReducers fulfilled', () => {
    const action = {
      type: postLogout.fulfilled.type,
      payload: response
    };
    const state = logoutSlice(initialState, action);
    expect(state).toEqual({ ...initialState, logout: response });
  });

  it('should logoutSlice extraReducers rejected', () => {
    const action = { type: postLogout.rejected.type };
    const state = logoutSlice(initialState, action);
    expect(state).toEqual({ ...initialState, isLogoutError: true });
  });
});
