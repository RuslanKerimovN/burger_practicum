import { IResetPasswordStatus } from '../../../types/types.ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postConfirmationEmailServices } from '../../api/services.ts';
import { baseResetResponse } from '../../../types/baseObjects.ts';

export interface IResetPassword {
    confirmationEmail: IResetPasswordStatus;
    isLoadingConfirmationEmail: boolean;
    isErrorConfirmationEmail: boolean;
}

const initialState: IResetPassword = {
  confirmationEmail: baseResetResponse,
  isLoadingConfirmationEmail: false,
  isErrorConfirmationEmail: false
};

export const postConfirmationEmail = createAsyncThunk<IResetPasswordStatus, string>(
  'postConfirmationEmail',
  async (email, { rejectWithValue }) => {
    const response = await postConfirmationEmailServices(email);

    if (!response.ok) {
      return rejectWithValue(true);
    }

    return await response.json();
  }
);

const confirmationEmailSlice = createSlice({
  name: 'confirmationEmailSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postConfirmationEmail.fulfilled, (state, action) => {
        state.confirmationEmail = action.payload;
        state.isLoadingConfirmationEmail = false;
        state.isErrorConfirmationEmail = false;
      })
      .addCase(postConfirmationEmail.pending, (state) => {
        state.isLoadingConfirmationEmail = true;
        state.isErrorConfirmationEmail = false;
      })
      .addCase(postConfirmationEmail.rejected, (state) => {
        state.isLoadingConfirmationEmail = false;
        state.isErrorConfirmationEmail = true;
      });
  }
});

export default confirmationEmailSlice.reducer;
