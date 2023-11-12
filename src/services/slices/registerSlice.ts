import { createAsyncThunk, createSelector, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { baseRegisterResponse } from '../../types/baseObjects';
import { IRegisterRequest, IRegisterResponse } from '../../types/types';
import { postRegisterService } from '../api/services';
import { RootState } from '../../store/store';
import { setCookie } from '../../helpers/helpers';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants/constants';

interface IRegister {
    registerData: IRegisterResponse;
    isRegisterLoading: boolean;
    isRegisterError: boolean;
}

const initialState: IRegister = {
  registerData: baseRegisterResponse,
  isRegisterLoading: false,
  isRegisterError: false
};

export const postRegister = createAsyncThunk<IRegisterResponse, IRegisterRequest>(
  'postRegister',
  async (params, { rejectWithValue }) => {
    const response = await postRegisterService(params);

    if (!response.ok) {
      return rejectWithValue(true);
    }

    return await response.json();
  }
);

const registerSlice = createSlice({
  name: 'registerSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postRegister.fulfilled, (state, action) => {
        state.registerData = action.payload;
        localStorage.setItem(REFRESH_TOKEN, `${(action.payload.refreshToken)}`);
        setCookie(ACCESS_TOKEN, `${(action.payload.accessToken).split('Bearer ')[1]}`);
        state.isRegisterLoading = false;
        state.isRegisterError = false;
      })
      .addMatcher(isAnyOf(postRegister.pending), (state) => {
        state.isRegisterLoading = true;
        state.isRegisterError = false;
      })
      .addMatcher(isAnyOf(postRegister.rejected), (state) => {
        state.isRegisterLoading = false;
        state.isRegisterError = true;
      });
  }
});

// export const {
// } = orderSlice.actions;
export default registerSlice.reducer;

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
