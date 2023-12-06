import { IResetPasswordRequest, IResetPasswordStatus } from '../../../types/types.ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postPasswordResetServices } from '../../api/services.ts';
import { baseResetResponse } from '../../../types/baseObjects.ts';

export interface IResetPassword {
    resetPassword: IResetPasswordStatus;
    isLoadingResetPassword: boolean;
    isErrorResetPassword: boolean;
}

const initialState: IResetPassword = {
  resetPassword: baseResetResponse,
  isLoadingResetPassword: false,
  isErrorResetPassword: false
};

export const postResetPassword = createAsyncThunk<IResetPasswordStatus, IResetPasswordRequest>(
  'postResetEmail',
  async (params, { rejectWithValue }) => {
    const response = await postPasswordResetServices(params);

    if (!response.ok) {
      return rejectWithValue(true);
    }

    return await response.json();
  }
);

const resetPasswordSlice = createSlice({
  name: 'resetPasswordSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postResetPassword.fulfilled, (state, action) => {
        state.resetPassword = action.payload;
        state.isLoadingResetPassword = false;
        state.isErrorResetPassword = false;
      })
      .addCase(postResetPassword.pending, (state) => {
        state.isLoadingResetPassword = true;
        state.isErrorResetPassword = false;
      })
      .addCase(postResetPassword.rejected, (state) => {
        state.isLoadingResetPassword = false;
        state.isErrorResetPassword = true;
      });
  }
});

export default resetPasswordSlice.reducer;
