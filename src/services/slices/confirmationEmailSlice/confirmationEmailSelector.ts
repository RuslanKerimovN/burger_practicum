import { RootState } from '../../../store/store.ts';
import { createSelector } from '@reduxjs/toolkit';

const confirmationEmail = (state: RootState) => state.confirmationEmailSlice.confirmationEmail;
const isLoadingConfirmationEmail = (state: RootState) => state.confirmationEmailSlice.isLoadingConfirmationEmail;
const isErrorConfirmationEmail = (state: RootState) => state.confirmationEmailSlice.isErrorConfirmationEmail;

export const getStateConfirmationEmail = createSelector(
  [confirmationEmail], (confirmationEmail) => confirmationEmail
);

export const getStateConfirmationEmailLoading = createSelector(
  [isLoadingConfirmationEmail], (isLoadingConfirmationEmail) => isLoadingConfirmationEmail
);

export const getStateConfirmationEmailError = createSelector(
  [isErrorConfirmationEmail], (isErrorConfirmationEmail) => isErrorConfirmationEmail
);
