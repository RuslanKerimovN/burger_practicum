import { RootState } from '../../../store/store.ts';
import { createSelector } from '@reduxjs/toolkit';

const login = (state: RootState) => state.loginSlice.login;
const loginName = (state: RootState) => state.loginSlice.loginName;
const isLoginLoading = (state: RootState) => state.loginSlice.isLoginLoading;
const isLoginError = (state: RootState) => state.loginSlice.isLoginError;

export const getStateLogin = createSelector(
  [login], (login) => login
);

export const getStateLoginName = createSelector(
  [loginName], (loginName) => loginName
);

export const getStateLoadingLogin = createSelector(
  [isLoginLoading], (isLoginLoading) => isLoginLoading
);

export const getStateErrorLogin = createSelector(
  [isLoginError], (isLoginError) => isLoginError
);
