import { RootState } from '../../../store/store.ts';
import { createSelector } from '@reduxjs/toolkit';

const user = (state: RootState) => state.userSlice.user;
const userEmail = (state: RootState) => state.userSlice.userEmail;
const userName = (state: RootState) => state.userSlice.userName;
const userPassword = (state: RootState) => state.userSlice.userPassword;
const isLoadingUser = (state: RootState) => state.userSlice.isLoadingUser;
const isErrorUser = (state: RootState) => state.userSlice.isErrorUser;
const isPatchLoadingUser = (state: RootState) => state.userSlice.isPatchLoadingUser;
const isPatchErrorUser = (state: RootState) => state.userSlice.isPatchErrorUser;
const isChangeData = (state: RootState) => state.userSlice.isChangeData;
const name = (state: RootState) => state.userSlice.name;

export const getStateUser = createSelector(
  [user], (user) => user
);

export const getStateUserEmail = createSelector(
  [userEmail], (userEmail) => userEmail
);

export const getStateUserName = createSelector(
  [userName], (userName) => userName
);

export const getStateUserPassword = createSelector(
  [userPassword], (userPassword) => userPassword
);

export const getStateLoadingUser = createSelector(
  [isLoadingUser], (isLoadingUser) => isLoadingUser
);

export const getStateErrorUser = createSelector(
  [isErrorUser], (isErrorUser) => isErrorUser
);

export const getStatePatchLoadingUser = createSelector(
  [isPatchLoadingUser], (isPatchLoadingUser) => isPatchLoadingUser
);

export const getStatePatchErrorUser = createSelector(
  [isPatchErrorUser], (isPatchErrorUser) => isPatchErrorUser
);

export const getStateIsChangeData = createSelector(
  [isChangeData], (isChangeData) => isChangeData
);

export const getStateName = createSelector(
  [name], (name) => name
);
