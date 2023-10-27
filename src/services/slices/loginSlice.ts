import { PayloadAction, createAsyncThunk, createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { baseAuthToken } from "../../types/baseObjects";
import { IAuthTokenRequest, IAuthTokenResponse } from "../../types/types";
import { postLoginService } from "../api/services";
import { RootState } from "../../store/store";
import { setCookie } from "../../helpers/helpers";

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
    isLoginError: false,
}

export const postLogin = createAsyncThunk<IAuthTokenResponse, IAuthTokenRequest>(
    'postLogin',
    async (params, {rejectWithValue}) => {
        const response = await postLoginService(params);

        if (!response.ok) {
            return rejectWithValue(true);
        }

        const data: IAuthTokenResponse = await response.json();
        return data;
    }
)

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: initialState,
    reducers: {
        setLoginName(state, action: PayloadAction<string>) {
            state.loginName = action.payload;
        },
        clearLogin(state) {
            state.login = baseAuthToken;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(postLogin.fulfilled, (state, action) => {
                state.login = action.payload;
                state.loginName = action.payload.user.name;
                localStorage.setItem('refreshToken', `${(action.payload.refreshToken)}`);
                setCookie('accessToken', `${(action.payload.accessToken).split('Bearer ')[1]}`);
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
            })
    }
});

export const {
    clearLogin, setLoginName
} = loginSlice.actions;
export default loginSlice.reducer;

const login = (state: RootState) => state.loginSlice.login;
const loginName = (state: RootState) => state.loginSlice.loginName;
const isLoginLoading = (state: RootState) => state.loginSlice.isLoginLoading;
const isLoginError = (state: RootState) => state.loginSlice.isLoginError;

export const getStateLogin = createSelector(
    [login], login => login
);

export const getStateLoginName = createSelector(
    [loginName], loginName => loginName
)

export const getStateLoadingLogin = createSelector(
    [isLoginLoading], isLoginLoading => isLoginLoading
);

export const getStateErrorLogin = createSelector(
    [isLoginError], isLoginError => isLoginError
);
