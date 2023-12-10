import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { baseRegisterResponse } from '../../../types/baseObjects.ts';
import { IRegisterRequest, IRegisterResponse } from '../../../types/types.ts';
import { postRegisterService } from '../../api/services.ts';
import { setCookie } from '../../../helpers/helpers.ts';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../constants/constants.ts';

export interface IRegister {
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

export default registerSlice.reducer;
