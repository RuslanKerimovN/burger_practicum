import { IResetPasswordRequest, IResetPasswordStatus } from "../../types/types";
import { createAsyncThunk, createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { postPasswordResetServices } from '../api/services';
import { RootState } from "../../store/store";
import { baseResetResponse } from "../../types/baseObjects";

export interface IResetPassword {
    resetPassword: IResetPasswordStatus;
    isLoadingResetPassword: boolean;
    isErrorResetPassword: boolean;
}

const initialState: IResetPassword = {
    resetPassword: baseResetResponse,
    isLoadingResetPassword: false,
    isErrorResetPassword: false,
}

export const postResetPassword = createAsyncThunk<IResetPasswordStatus, IResetPasswordRequest>(
    'postResetEmail',
    async (params, {rejectWithValue}) => {
        const response = await postPasswordResetServices(params);

        if (!response.ok) {
            return rejectWithValue(true);
        }

        const data = await response.json();
        return data;
    }
)

const resetPasswordSlice = createSlice({
    name: 'resetPasswordSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postResetPassword.fulfilled, (state, action) => {
                state.resetPassword = action.payload;
                state.isLoadingResetPassword = false;
                state.isErrorResetPassword = false;
            })
            .addCase(postResetPassword.pending, (state) => {
                state.isLoadingResetPassword = true;
                state.isErrorResetPassword = false;
            })
            .addCase(postResetPassword.rejected, (state) => {
                state.isLoadingResetPassword = false;
                state.isErrorResetPassword = true;
            })
    }
});

// export const {
// } = ingredientsSlice.actions;
export default resetPasswordSlice.reducer;

const resetPassword = (state: RootState) => state.resetPasswordSlice.resetPassword;
const isLoadingResetPassword = (state: RootState) => state.resetPasswordSlice.isLoadingResetPassword;
const isErrorResetPassword = (state: RootState) => state.resetPasswordSlice.isErrorResetPassword;

export const getStateResetPassword = createSelector(
    [resetPassword], resetPassword => resetPassword
);

export const getStateResetPasswordLoading = createSelector(
    [isLoadingResetPassword], isLoadingResetPassword => isLoadingResetPassword
);

export const getStateResetPasswordError = createSelector(
    [isErrorResetPassword], isErrorResetPassword => isErrorResetPassword
);
