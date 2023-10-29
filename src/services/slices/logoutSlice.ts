import { createAsyncThunk, createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { baseLogout } from "../../types/baseObjects";
import { ILogoutResponse } from "../../types/types";
import { postLogoutService } from "../api/services";
import { RootState } from "../../store/store";

interface ILogout {
    logout: ILogoutResponse;
    isLogoutLoading: boolean;
    isLogoutError: boolean;
}

const initialState: ILogout = {
    logout: baseLogout,
    isLogoutLoading: false,
    isLogoutError: false,
}

export const postLogout = createAsyncThunk<ILogoutResponse, string>(
    'postLogout',
    async (token, {rejectWithValue}) => {
        const response = await postLogoutService(token);

        if (!response.ok) {
            return rejectWithValue(true);
        }

        const data = await response.json();
        return data;
    }
)

const logoutSlice = createSlice({
    name: 'logoutSlice',
    initialState: initialState,
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
            })
    }
});

// export const {
// } = orderSlice.actions;
export default logoutSlice.reducer;

const logout = (state: RootState) => state.logoutSlice.logout;
const isLogoutLoading = (state: RootState) => state.logoutSlice.isLogoutLoading;
const isLogoutError = (state: RootState) => state.logoutSlice.isLogoutError;

export const getStateLogout = createSelector(
    [logout], logout => logout
);

export const getStateLoadingLogout = createSelector(
    [isLogoutLoading], isLogoutLoading => isLogoutLoading
);

export const getStateErrorLogout = createSelector(
    [isLogoutError], isLogoutError => isLogoutError
);
