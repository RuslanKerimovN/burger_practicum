import confirmationEmailSlice, { IResetPassword, postConfirmationEmail } from './confirmationEmailSlice.ts';
import { describe, expect, it } from 'vitest';
import { baseResetResponse } from '../../../types/baseObjects.ts';

describe('Тестирование confirmationEmailSlice', () => {
  const initialState: IResetPassword = {
    confirmationEmail: baseResetResponse,
    isLoadingConfirmationEmail: false,
    isErrorConfirmationEmail: false
  };

  it('postConfirmationEmail pending', () => {
    const action = { type: postConfirmationEmail.pending.type };
    const state = confirmationEmailSlice(initialState, action);
    expect(state).toEqual({
      confirmationEmail: { success: false, message: '' },
      isLoadingConfirmationEmail: true,
      isErrorConfirmationEmail: false
    });
  });

  it('postConfirmationEmail fulfilled', () => {
    const action = {
      type: postConfirmationEmail.fulfilled.type,
      payload: { success: true, message: 'message' }
    };
    const state = confirmationEmailSlice(initialState, action);
    expect(state).toEqual({
      confirmationEmail: { success: true, message: 'message' },
      isLoadingConfirmationEmail: false,
      isErrorConfirmationEmail: false
    });
  });

  it('postConfirmationEmail rejected', () => {
    const action = { type: postConfirmationEmail.rejected.type };
    const state = confirmationEmailSlice(initialState, action);
    expect(state).toEqual({
      confirmationEmail: { success: false, message: '' },
      isLoadingConfirmationEmail: false,
      isErrorConfirmationEmail: true
    });
  });
});

//TODO: спросить на лекции

// it('some dfsdg', async () => {
//   const mock: IResetPasswordStatus  = { success: false, message: '' };
//   vi.fn().mockResolvedValue( {
//     ok: true,
//     json: () => Promise.resolve(mock)
//   });
//   const dispatch = vi.fn();
//   const thunk = postConfirmationEmail('');
//   await thunk(dispatch, () => {}, {} );
//   console.log(dispatch.mock.calls);
//   const { calls } = dispatch.mock;
//   expect(calls).toHaveLength(2);
//   const [start, end] = calls;
//   expect(start[0].type).toBe('postConfirmationEmail/pending');
//   expect(end[0].type).toBe('postConfirmationEmail/fulfilled');
//   console.log(end[0].payload);
//   expect(end[0].payload).toEqual(mock);
// });
