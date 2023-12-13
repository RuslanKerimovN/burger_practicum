import resetPasswordSlice, { IResetPassword, postResetPassword } from './resetPasswordSlice.ts';
import { describe, expect, it, vi } from 'vitest';
import { getMockRequests } from '../../../helpers/testHelpers.ts';
import { baseResetResponse } from '../../../types/baseObjects.ts';

describe('Testing registerSlice', () => {
  const initialState: IResetPassword = {
    resetPassword: baseResetResponse,
    isLoadingResetPassword: false,
    isErrorResetPassword: false
  };
  const request = { password: '', token: '' };
  const response = { success: false, message: 'message' };

  it('resetPasswordSlice initialState', () => {
    const result = resetPasswordSlice(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should resetPasswordSlice request fulfilled', async () => {
    const fetchMock = getMockRequests({
      ok: true,
      json: () => Promise.resolve(response)
    });
    vi.stubGlobal('fetch', fetchMock);

    const dispatch = vi.fn();
    const thunk = postResetPassword(request);
    await thunk(dispatch, () => {}, {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('postResetPassword/pending');
    expect(end[0].type).toBe('postResetPassword/fulfilled');
    expect(end[0].payload).toEqual(response);
  });

  it('should resetPasswordSlice request rejected', async () => {
    const fetchMock = getMockRequests({ ok: false });
    vi.stubGlobal('fetch', fetchMock);

    const dispatch = vi.fn();
    const thunk = postResetPassword(request);
    await thunk(dispatch, () => {}, {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('postResetPassword/pending');
    expect(end[0].type).toBe('postResetPassword/rejected');
    expect(end[0].payload).toEqual(true);
  });

  it('should postResetPassword extraReducers pending', () => {
    const action = { type: postResetPassword.pending.type };
    const state = resetPasswordSlice(initialState, action);
    expect(state).toEqual({ ...initialState, isLoadingResetPassword: true });
  });

  it('should postResetPassword extraReducers fulfilled', () => {
    const action = {
      type: postResetPassword.fulfilled.type,
      payload: response
    };
    const state = resetPasswordSlice(initialState, action);
    expect(state).toEqual({ ...initialState, resetPassword: response });
  });

  it('should resetPasswordSlice extraReducers rejected', () => {
    const action = { type: postResetPassword.rejected.type };
    const state = resetPasswordSlice(initialState, action);
    expect(state).toEqual({ ...initialState, isErrorResetPassword: true });
  });
});
