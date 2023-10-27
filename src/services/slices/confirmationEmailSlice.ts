import { IResetPasswordStatus } from "../../types/types";
import { createAsyncThunk, createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { postConfirmationEmailServices } from '../api/services';
import { RootState } from "../../store/store";
import { baseResetResponse } from "../../types/baseObjects";

export interface IResetPassword {
    confirmationEmail: IResetPasswordStatus;
    isLoadingConfirmationEmail: boolean;
    isErrorConfirmationEmail: boolean;
}

const initialState: IResetPassword = {
    confirmationEmail: baseResetResponse,
    isLoadingConfirmationEmail: false,
    isErrorConfirmationEmail: false,
}

export const postConfirmationEmail = createAsyncThunk<IResetPasswordStatus, string>(
    'postConfirmationEmail',
    async (email, {rejectWithValue}) => {
        const response = await postConfirmationEmailServices(email);

        if (!response.ok) {
            return rejectWithValue(true);
        }

        const data = await response.json();
        return data;
    }
)

const confirmationEmailSlice = createSlice({
    name: 'confirmationEmailSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postConfirmationEmail.fulfilled, (state, action) => {
                state.confirmationEmail = action.payload;
                state.isLoadingConfirmationEmail = false;
                state.isErrorConfirmationEmail = false;
            })
            .addCase(postConfirmationEmail.pending, (state) => {
                state.isLoadingConfirmationEmail = true;
                state.isErrorConfirmationEmail = false;
            })
            .addCase(postConfirmationEmail.rejected, (state) => {
                state.isLoadingConfirmationEmail = false;
                state.isErrorConfirmationEmail = true;
            })
    }
});

// export const {
// } = ingredientsSlice.actions;
export default confirmationEmailSlice.reducer;

const confirmationEmail = (state: RootState) => state.confirmationEmailSlice.confirmationEmail;
const isLoadingConfirmationEmail = (state: RootState) => state.confirmationEmailSlice.isLoadingConfirmationEmail;
const isErrorConfirmationEmail = (state: RootState) => state.confirmationEmailSlice.isErrorConfirmationEmail;

export const getStateConfirmationEmail = createSelector(
    [confirmationEmail], confirmationEmail => confirmationEmail
);

export const getStateConfirmationEmailLoading = createSelector(
    [isLoadingConfirmationEmail], isLoadingConfirmationEmail => isLoadingConfirmationEmail
);

export const getStateConfirmationEmailError = createSelector(
    [isErrorConfirmationEmail], isErrorConfirmationEmail => isErrorConfirmationEmail
);
