import userSlice, {
  IUserInfo,
  patchUser,
  getUser,
  setUserEmail,
  setUserName,
  setUserPassword,
  resetChanges,
  deleteUser
} from './userSlice.ts';
import { describe, expect, it, vi } from 'vitest';
import { getMockRequests } from '../../../helpers/testHelpers.ts';
import {  baseUser } from '../../../types/baseObjects.ts';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../constants/constants.ts';
import { deleteCookie, setCookie } from '../../../helpers/helpers.ts';

describe('Testing userSlice', () => {
  const initialState: IUserInfo = {
    user: baseUser,
    userEmail: '',
    userName: '',
    userPassword: '',

    name: '',
    email: '',
    password: '',

    isChangeData: false,

    isLoadingUser: false,
    isErrorUser: false,

    isPatchLoadingUser: false,
    isPatchErrorUser: false
  };
  const requestPatch = {
    name: '',
    email: '',
    password: ''
  };
  const response = {
    success: false,
    user: {
      email: '123',
      name: '123'
    }
  };

  it('userSlice initialState', () => {
    const result = userSlice(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should userSlice request PATCH fulfilled', async () => {
    const fetchMock = getMockRequests({
      ok: true,
      json: () => Promise.resolve(response)
    });
    vi.stubGlobal('fetch', fetchMock);

    localStorage.setItem(REFRESH_TOKEN, '123');
    setCookie(ACCESS_TOKEN, '123');

    const dispatch = vi.fn();
    const thunk = patchUser(requestPatch);
    await thunk(dispatch, () => {}, {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('patchUser/pending');
    expect(end[0].type).toBe('patchUser/fulfilled');
    expect(end[0].payload).toEqual(response);

    localStorage.removeItem(REFRESH_TOKEN);
    deleteCookie(ACCESS_TOKEN);
  });

  it('should userSlice request PATCH rejected', async () => {
    const fetchMock = getMockRequests({ ok: false });
    vi.stubGlobal('fetch', fetchMock);

    const dispatch = vi.fn();
    const thunk = patchUser(requestPatch);
    await thunk(dispatch, () => {}, {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('patchUser/pending');
    expect(end[0].type).toBe('patchUser/rejected');
    expect(end[0].payload).toEqual(true);
  });

  it('should userSlice extraReducers PATCH pending', () => {
    const action = { type: patchUser.pending.type };
    const state = userSlice(initialState, action);
    expect(state).toEqual({ ...initialState, isPatchLoadingUser: true });
  });

  it('should userSlice extraReducers PATCH fulfilled', () => {
    const action = {
      type: patchUser.fulfilled.type,
      payload: response
    };
    const state = userSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: response,
      userEmail: response.user.email,
      userName: response.user.name,
      name: response.user.name,
      email: response.user.email
    });

    localStorage.removeItem(REFRESH_TOKEN);
    deleteCookie(ACCESS_TOKEN);
  });

  it('should userSlice extraReducers PATCH rejected', () => {
    const action = { type: patchUser.rejected.type };
    const state = userSlice(initialState, action);
    expect(state).toEqual({ ...initialState, isPatchErrorUser: true });
  });

  it('should userSlice request GET fulfilled', async () => {
    const fetchMock = getMockRequests({
      ok: true,
      json: () => Promise.resolve(response)
    });
    vi.stubGlobal('fetch', fetchMock);

    localStorage.setItem(REFRESH_TOKEN, '123');
    setCookie(ACCESS_TOKEN, '123');

    const dispatch = vi.fn();
    const thunk = getUser();
    await thunk(dispatch, () => {}, {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('getUser/pending');
    expect(end[0].type).toBe('getUser/fulfilled');
    expect(end[0].payload).toEqual(response);

    localStorage.removeItem(REFRESH_TOKEN);
    deleteCookie(ACCESS_TOKEN);
  });

  it('should userSlice request GET rejected', async () => {
    const fetchMock = getMockRequests({ ok: false });
    vi.stubGlobal('fetch', fetchMock);

    const dispatch = vi.fn();
    const thunk = getUser();
    await thunk(dispatch, () => {}, {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('getUser/pending');
    expect(end[0].type).toBe('getUser/rejected');
    expect(end[0].payload).toEqual(true);
  });

  it('should userSlice extraReducers GET pending', () => {
    const action = { type: getUser.pending.type };
    const state = userSlice(initialState, action);
    expect(state).toEqual({ ...initialState, isLoadingUser: true });
  });

  it('should userSlice extraReducers GET fulfilled', () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: response
    };
    const state = userSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: response,
      userEmail: response.user.email,
      userName: response.user.name,
      name: response.user.name,
      email: response.user.email
    });

    localStorage.removeItem(REFRESH_TOKEN);
    deleteCookie(ACCESS_TOKEN);
  });

  it('should userSlice extraReducers GET rejected', () => {
    const action = { type: getUser.rejected.type };
    const state = userSlice(initialState, action);
    expect(state).toEqual({ ...initialState, isErrorUser: true });
  });


  it('setUserEmail', () => {
    const action = {
      type: setUserEmail.type,
      payload: '123'
    };
    const result = userSlice(initialState, action);
    expect(result).toEqual({ ...initialState, isChangeData: true, userEmail: '123' });
  });

  it('setUserName', () => {
    const action = {
      type: setUserName.type,
      payload: '123'
    };
    const result = userSlice(initialState, action);
    expect(result).toEqual({ ...initialState, isChangeData: true, userName: '123' });
  });

  it('setUserPassword', () => {
    const action = {
      type: setUserPassword.type,
      payload: '123'
    };
    const result = userSlice(initialState, action);
    expect(result).toEqual({ ...initialState, isChangeData: true, userPassword: '123' });
  });

  it('resetChanges', () => {
    const resetChangesInitialState = {
      ...initialState,
      isChangeData: true,
      userName: '123',
      userEmail: '123',
      userPassword: '123',
      name: 'name',
      email: 'email',
      password: 'password'
    };
    const action = {
      type: resetChanges.type
    };
    const result = userSlice(resetChangesInitialState, action);
    expect(result).toEqual({
      ...resetChangesInitialState,
      isChangeData: false,
      userName: 'name',
      userEmail: 'email',
      userPassword: 'password'
    });
  });

  it('deleteUser', () => {
    const action = {
      type: deleteUser.type
    };
    const result = userSlice(initialState, action);
    expect(result).toEqual(initialState);
  });
});
