import updateTokenSlice, { IUpdateToken, postUpdateToken } from './updateTokenSlice.ts';
import { describe, expect, it, vi } from 'vitest';
import { getMockRequests } from '../../../helpers/testHelpers.ts';
import { baseAuthToken } from '../../../types/baseObjects.ts';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../constants/constants.ts';
import { deleteCookie } from '../../../helpers/helpers.ts';

describe('Testing updateTokenSlice', () => {
  const initialState: IUpdateToken = {
    token: baseAuthToken,
    isTokenLoading: false,
    isTokenError: false
  };
  const response = {
    success: false,
    accessToken: '',
    refreshToken: '',
    user: {
      email: '',
      name: ''
    }
  };

  it('updateTokenSlice initialState', () => {
    const result = updateTokenSlice(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should updateTokenSlice request fulfilled', async () => {
    const fetchMock = getMockRequests({
      ok: true,
      json: () => Promise.resolve(response)
    });
    vi.stubGlobal('fetch', fetchMock);

    const dispatch = vi.fn();
    const thunk = postUpdateToken('');
    await thunk(dispatch, () => {}, {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('postUpdateToken/pending');
    expect(end[0].type).toBe('postUpdateToken/fulfilled');
    expect(end[0].payload).toEqual(response);
  });

  it('should updateTokenSlice request rejected', async () => {
    const fetchMock = getMockRequests({ ok: false });
    vi.stubGlobal('fetch', fetchMock);

    const dispatch = vi.fn();
    const thunk = postUpdateToken('');
    await thunk(dispatch, () => {}, {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('postUpdateToken/pending');
    expect(end[0].type).toBe('postUpdateToken/rejected');
    expect(end[0].payload).toEqual(true);
  });

  it('should updateTokenSlice extraReducers pending', () => {
    const action = { type: postUpdateToken.pending.type };
    const state = updateTokenSlice(initialState, action);
    expect(state).toEqual({ ...initialState, isTokenLoading: true });
  });

  it('should updateTokenSlice extraReducers fulfilled', () => {
    const action = {
      type: postUpdateToken.fulfilled.type,
      payload: response
    };
    const state = updateTokenSlice(initialState, action);
    expect(state).toEqual({ ...initialState, token: response });

    localStorage.removeItem(REFRESH_TOKEN);
    deleteCookie(ACCESS_TOKEN);
  });

  it('should updateTokenSlice extraReducers rejected', () => {
    const action = { type: postUpdateToken.rejected.type };
    const state = updateTokenSlice(initialState, action);
    expect(state).toEqual({ ...initialState, isTokenError: true });
  });
});
