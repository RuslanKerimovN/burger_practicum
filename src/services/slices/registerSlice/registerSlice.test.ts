import registerSlice, { IRegister, postRegister } from './registerSlice.ts';
import { describe, expect, it, vi } from 'vitest';
import { getMockRequests } from '../../../helpers/testHelpers.ts';
import { baseRegisterResponse } from '../../../types/baseObjects.ts';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../constants/constants.ts';
import { deleteCookie } from '../../../helpers/helpers.ts';

describe('Testing registerSlice', () => {
  const initialState: IRegister = {
    registerData: baseRegisterResponse,
    isRegisterLoading: false,
    isRegisterError: false
  };
  const request = {
    email: '',
    password: '',
    name: ''
  };
  const response = {
    success: false,
    user: {
      email: '',
      name: ''
    },
    accessToken: '123',
    refreshToken: ''
  };

  it('registerSlice initialState', () => {
    const result = registerSlice(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should registerSlice request fulfilled', async () => {
    const fetchMock = getMockRequests({
      ok: true,
      json: () => Promise.resolve(response)
    });
    vi.stubGlobal('fetch', fetchMock);

    const dispatch = vi.fn();
    const thunk = postRegister(request);
    await thunk(dispatch, () => {}, {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('postRegister/pending');
    expect(end[0].type).toBe('postRegister/fulfilled');
    expect(end[0].payload).toEqual(response);
  });

  it('should registerSlice request rejected', async () => {
    const fetchMock = getMockRequests({ ok: false });
    vi.stubGlobal('fetch', fetchMock);

    const dispatch = vi.fn();
    const thunk = postRegister(request);
    await thunk(dispatch, () => {}, {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('postRegister/pending');
    expect(end[0].type).toBe('postRegister/rejected');
    expect(end[0].payload).toEqual(true);
  });

  it('should registerSlice extraReducers pending', () => {
    const action = { type: postRegister.pending.type };
    const state = registerSlice(initialState, action);
    expect(state).toEqual({ ...initialState, isRegisterLoading: true });
  });

  it('should registerSlice extraReducers fulfilled', () => {
    const action = {
      type: postRegister.fulfilled.type,
      payload: response
    };
    const state = registerSlice(initialState, action);
    expect(state).toEqual({ ...initialState, registerData: response });

    localStorage.removeItem(REFRESH_TOKEN);
    deleteCookie(ACCESS_TOKEN);
  });

  it('should registerSlice extraReducers rejected', () => {
    const action = { type: postRegister.rejected.type };
    const state = registerSlice(initialState, action);
    expect(state).toEqual({ ...initialState, isRegisterError: true });
  });
});
