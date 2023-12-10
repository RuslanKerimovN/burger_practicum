import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseAuthToken } from '../../../types/baseObjects.ts';
import { IAuthTokenResponse } from '../../../types/types.ts';
import { postUpdateTokenService } from '../../api/services.ts';
import { setCookie } from '../../../helpers/helpers.ts';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../constants/constants.ts';

export interface IUpdateToken {
    token: IAuthTokenResponse;
    isTokenLoading: boolean;
    isTokenError: boolean;
}

const initialState: IUpdateToken = {
  token: baseAuthToken,
  isTokenLoading: false,
  isTokenError: false
};

export const postUpdateToken = createAsyncThunk<IAuthTokenResponse, string>(
  'postUpdateToken',
  async (token, { rejectWithValue }) => {
    const response = await postUpdateTokenService(token);

    if (!response.ok) {
      return rejectWithValue(true);
    }

    return await response.json();
  }
);

const updateTokenSlice = createSlice({
  name: 'updateTokenSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postUpdateToken.fulfilled, (state, action) => {
        state.token = action.payload;
        localStorage.setItem(REFRESH_TOKEN, `${(action.payload.refreshToken)}`);
        setCookie(ACCESS_TOKEN, `${(action.payload.accessToken).split('Bearer ')[1]}`);
        state.isTokenLoading = false;
        state.isTokenError = false;
      })
      .addCase(postUpdateToken.pending, (state) => {
        state.isTokenLoading = true;
        state.isTokenError = false;
      })
      .addCase(postUpdateToken.rejected, (state) => {
        state.isTokenLoading = false;
        state.isTokenError = true;
      });
  }
});

export default updateTokenSlice.reducer;
