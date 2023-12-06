import { RootState } from '../../../store/store.ts';
import { createSelector } from '@reduxjs/toolkit';

const resetPassword = (state: RootState) => state.resetPasswordSlice.resetPassword;
const isLoadingResetPassword = (state: RootState) => state.resetPasswordSlice.isLoadingResetPassword;
const isErrorResetPassword = (state: RootState) => state.resetPasswordSlice.isErrorResetPassword;

export const getStateResetPassword = createSelector(
  [resetPassword], (resetPassword) => resetPassword
);

export const getStateResetPasswordLoading = createSelector(
  [isLoadingResetPassword], (isLoadingResetPassword) => isLoadingResetPassword
);

export const getStateResetPasswordError = createSelector(
  [isErrorResetPassword], (isErrorResetPassword) => isErrorResetPassword
);
