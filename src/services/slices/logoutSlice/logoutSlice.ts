import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { baseLogout } from '../../../types/baseObjects.ts';
import { ILogoutResponse } from '../../../types/types.ts';
import { postLogoutService } from '../../api/services.ts';

interface ILogout {
    logout: ILogoutResponse;
    isLogoutLoading: boolean;
    isLogoutError: boolean;
}

const initialState: ILogout = {
  logout: baseLogout,
  isLogoutLoading: false,
  isLogoutError: false
};

export const postLogout = createAsyncThunk<ILogoutResponse, string>(
  'postLogout',
  async (token, { rejectWithValue }) => {
    const response = await postLogoutService(token);

    if (!response.ok) {
      return rejectWithValue(true);
    }

    return await response.json();
  }
);

const logoutSlice = createSlice({
  name: 'logoutSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postLogout.fulfilled, (state, action) => {
        state.logout = action.payload;
        state.isLogoutLoading = false;
        state.isLogoutError = false;
      })
      .addMatcher(isAnyOf(postLogout.pending), (state) => {
        state.isLogoutLoading = true;
        state.isLogoutError = false;
      })
      .addMatcher(isAnyOf(postLogout.rejected), (state) => {
        state.isLogoutLoading = false;
        state.isLogoutError = true;
      });
  }
});

export default logoutSlice.reducer;
