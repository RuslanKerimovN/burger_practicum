import { PayloadAction, createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { baseAuthToken } from '../../../types/baseObjects.ts';
import { IAuthTokenRequest, IAuthTokenResponse } from '../../../types/types.ts';
import { postLoginService } from '../../api/services.ts';
import { setCookie } from '../../../helpers/helpers.ts';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../constants/constants.ts';

interface ILogin {
    login: IAuthTokenResponse;
    loginName: string;
    isLoginLoading: boolean;
    isLoginError: boolean;
}

const initialState: ILogin = {
  login: baseAuthToken,
  loginName: '',
  isLoginLoading: false,
  isLoginError: false
};

export const postLogin = createAsyncThunk<IAuthTokenResponse, IAuthTokenRequest>(
  'postLogin',
  async (params, { rejectWithValue }) => {
    const response = await postLoginService(params);

    if (!response.ok) {
      return rejectWithValue(true);
    }

    return await response.json();
  }
);

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    setLoginName(state, action: PayloadAction<string>) {
      state.loginName = action.payload;
    },
    clearLogin(state) {
      state.login = baseAuthToken;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.fulfilled, (state, action) => {
        state.login = action.payload;
        state.loginName = action.payload.user.name;
        localStorage.setItem(REFRESH_TOKEN, `${(action.payload.refreshToken)}`);
        setCookie(ACCESS_TOKEN, `${(action.payload.accessToken).split('Bearer ')[1]}`);
        state.isLoginLoading = false;
        state.isLoginError = false;
      })
      .addMatcher(isAnyOf(postLogin.pending), (state) => {
        state.isLoginLoading = true;
        state.isLoginError = false;
      })
      .addMatcher(isAnyOf(postLogin.rejected), (state) => {
        state.isLoginLoading = false;
        state.isLoginError = true;
      });
  }
});

export const {
  clearLogin,
  setLoginName
} = loginSlice.actions;
export default loginSlice.reducer;
