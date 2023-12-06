import { RootState } from '../../../store/store.ts';
import { createSelector } from '@reduxjs/toolkit';

const logout = (state: RootState) => state.logoutSlice.logout;
const isLogoutLoading = (state: RootState) => state.logoutSlice.isLogoutLoading;
const isLogoutError = (state: RootState) => state.logoutSlice.isLogoutError;

export const getStateLogout = createSelector(
  [logout], (logout) => logout
);

export const getStateLoadingLogout = createSelector(
  [isLogoutLoading], (isLogoutLoading) => isLogoutLoading
);

export const getStateErrorLogout = createSelector(
  [isLogoutError], (isLogoutError) => isLogoutError
);
