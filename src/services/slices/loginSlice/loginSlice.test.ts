import loginSlice, { ILogin, postLogin } from './loginSlice.ts';
import { describe, expect, it, vi } from 'vitest';
import { getMockRequests } from '../../../helpers/testHelpers.ts';
import { baseAuthToken } from '../../../types/baseObjects.ts';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../constants/constants.ts';
import { deleteCookie } from '../../../helpers/helpers.ts';

describe('Testing loginSlice', () => {
  const initialState: ILogin = {
    login: baseAuthToken,
    loginName: '',
    isLoginLoading: false,
    isLoginError: false
  };
  const user = { email: 'email', name: 'name' };
  const request = { email: '123', password: '123' };

  it('ingredientsSlice initialState', () => {
    const result = loginSlice(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should loginSlice request fulfilled', async () => {
    const fetchMock = getMockRequests({
      ok: true,
      json: () => Promise.resolve({ ...baseAuthToken, user })
    });
    vi.stubGlobal('fetch', fetchMock);

    const dispatch = vi.fn();
    const thunk = postLogin(request);
    await thunk(dispatch, () => {}, {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('postLogin/pending');
    expect(end[0].type).toBe('postLogin/fulfilled');
    expect(end[0].payload).toEqual({ ...baseAuthToken, user });
  });

  it('should loginSlice request rejected', async () => {
    const fetchMock = getMockRequests({ ok: false });
    vi.stubGlobal('fetch', fetchMock);

    const dispatch = vi.fn();
    const thunk = postLogin(request);
    await thunk(dispatch, () => {}, {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('postLogin/pending');
    expect(end[0].type).toBe('postLogin/rejected');
    expect(end[0].payload).toEqual(true);
  });

  it('should loginSlice extraReducers pending', () => {
    const action = { type: postLogin.pending.type };
    const state = loginSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoginLoading: true
    });
  });

  it('should loginSlice extraReducers fulfilled', () => {
    const action = {
      type: postLogin.fulfilled.type,
      payload: { ...baseAuthToken, user }
    };
    const state = loginSlice(initialState, action);
    expect(state).toEqual({
      login: { ...baseAuthToken, user },
      loginName: user.name,
      isLoginLoading: false,
      isLoginError: false
    });

    localStorage.removeItem(REFRESH_TOKEN);
    deleteCookie(ACCESS_TOKEN);
  });

  it('should loginSlice extraReducers rejected', () => {
    const action = { type: postLogin.rejected.type };
    const state = loginSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoginError: true
    });
  });
});
