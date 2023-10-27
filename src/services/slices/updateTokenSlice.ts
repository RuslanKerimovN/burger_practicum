import { createAsyncThunk, createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { baseAuthToken } from "../../types/baseObjects";
import { IAuthTokenRequest, IAuthTokenResponse } from "../../types/types";
import { postUpdateTokenService } from "../api/services";
import { RootState } from "../../store/store";
import { setCookie } from "../../helpers/helpers";

interface IUpadateToken {
    token: IAuthTokenResponse;
    isTokenLoading: boolean;
    isTokenError: boolean;
}

const initialState: IUpadateToken = {
    token: baseAuthToken,
    isTokenLoading: false,
    isTokenError: false,
}

export const postUpdateToken = createAsyncThunk<IAuthTokenResponse, string>(
    'postUpdateToken',
    async (token, {rejectWithValue}) => {
        const response = await postUpdateTokenService(token);

        if (!response.ok) {
            return rejectWithValue(true);
        }

        const data = await response.json();
        return data;
    }
)

const updateTokenSlice = createSlice({
    name: 'updateTokenSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postUpdateToken.fulfilled, (state, action) => {
                state.token = action.payload;
                localStorage.setItem('refreshToken', `${(action.payload.refreshToken)}`);
                setCookie('accessToken', `${(action.payload.accessToken).split('Bearer ')[1]}`);
                state.isTokenLoading = false;
                state.isTokenError = false;
            })
            .addMatcher(isAnyOf(postUpdateToken.pending), (state) => {
                state.isTokenLoading = true;
                state.isTokenError = false;
            })
            .addMatcher(isAnyOf(postUpdateToken.rejected), (state) => {
                state.isTokenLoading = false;
                state.isTokenError = true;
            })
    }
});

// export const {
// } = orderSlice.actions;
export default updateTokenSlice.reducer;

const token = (state: RootState) => state.updateTokenSlice.token;
const isTokenLoading = (state: RootState) => state.updateTokenSlice.isTokenLoading;
const isTokenError = (state: RootState) => state.updateTokenSlice.isTokenError;

export const getStateToken = createSelector(
    [token], token => token
);

export const getStateLoadingToken = createSelector(
    [isTokenLoading], isTokenLoading => isTokenLoading
);

export const getStateErrorToken = createSelector(
    [isTokenError], isTokenError => isTokenError
);
