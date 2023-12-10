import confirmationEmailSlice, { IResetPassword, postConfirmationEmail } from './confirmationEmailSlice.ts';
import { describe, expect, it, vi } from 'vitest';
import { baseResetResponse } from '../../../types/baseObjects.ts';
import { IResetPasswordStatus } from '../../../types/types.ts';
import { getMockRequests } from '../../../helpers/testHelpers.ts';

describe('Testing confirmationEmailSlice', () => {
  const initialState: IResetPassword = {
    confirmationEmail: baseResetResponse,
    isLoadingConfirmationEmail: false,
    isErrorConfirmationEmail: false
  };
  const response: IResetPasswordStatus = { success: true, message: 'message' };


  it('confirmationEmailSlice initialState', () => {
    const result = confirmationEmailSlice(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should postConfirmationEmail request fulfilled', async () => {
    const fetchMock = getMockRequests({
      ok: true,
      json: () => Promise.resolve(response)
    });
    vi.stubGlobal('fetch', fetchMock);

    const dispatch = vi.fn();
    const thunk = postConfirmationEmail('');
    await thunk(dispatch, () => {}, {} );

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('postConfirmationEmail/pending');
    expect(end[0].type).toBe('postConfirmationEmail/fulfilled');
    expect(end[0].payload).toEqual(response);
  });

  it('should postConfirmationEmail request rejected', async () => {
    const fetchMock = getMockRequests({ ok: false });
    vi.stubGlobal('fetch', fetchMock);

    const dispatch = vi.fn();
    const thunk = postConfirmationEmail('');
    await thunk(dispatch, () => {}, {} );

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('postConfirmationEmail/pending');
    expect(end[0].type).toBe('postConfirmationEmail/rejected');
    expect(end[0].payload).toEqual(true);
  });

  it('should postConfirmationEmail extraReducers pending', () => {
    const action = { type: postConfirmationEmail.pending.type };
    const state = confirmationEmailSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoadingConfirmationEmail: true
    });
  });

  it('should postConfirmationEmail extraReducers fulfilled', () => {
    const action = {
      type: postConfirmationEmail.fulfilled.type,
      payload: response
    };
    const state = confirmationEmailSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      confirmationEmail: response
    });
  });

  it('should postConfirmationEmail extraReducers rejected', () => {
    const action = { type: postConfirmationEmail.rejected.type };
    const state = confirmationEmailSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isErrorConfirmationEmail: true
    });
  });
});
