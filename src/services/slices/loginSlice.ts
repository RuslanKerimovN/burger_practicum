import { createAsyncThunk, createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { baseAuthToken } from "../../types/baseObjects";
import { IAuthTokenRequest, IAuthTokenResponse } from "../../types/types";
import { postLoginService } from "../api/services";
import { RootState } from "../../store/store";

interface ILogin {
    login: IAuthTokenResponse;
    isLoginLoading: boolean;
    isLoginError: boolean;
}

const initialState: ILogin = {
    login: baseAuthToken,
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

        const data = await response.json();
        return data;
    }
)

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postLogin.fulfilled, (state, action) => {
                state.login = action.payload;
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

// export const {
// } = orderSlice.actions;
export default loginSlice.reducer;

const login = (state: RootState) => state.loginSlice.login;
const isLoginLoading = (state: RootState) => state.loginSlice.isLoginLoading;
const isLoginError = (state: RootState) => state.loginSlice.isLoginError;

export const getStateLogin = createSelector(
    [login], login => login
);

export const getStateLoadingLogin = createSelector(
    [isLoginLoading], isLoginLoading => isLoginLoading
);

export const getStateErrorLogin = createSelector(
    [isLoginError], isLoginError => isLoginError
);
