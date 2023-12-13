import { RootState } from '../../../store/store.ts';
import { createSelector } from '@reduxjs/toolkit';

const registerData = (state: RootState) => state.registerSlice.registerData;
const isRegisterLoading = (state: RootState) => state.registerSlice.isRegisterLoading;
const isRegisterError = (state: RootState) => state.registerSlice.isRegisterError;

export const getStateRegisterData = createSelector(
  [registerData], (registerData) => registerData
);

export const getStateLoadingRegisterData = createSelector(
  [isRegisterLoading], (isRegisterLoading) => isRegisterLoading
);

export const getStateErrorRegisterData = createSelector(
  [isRegisterError], (isRegisterError) => isRegisterError
);
