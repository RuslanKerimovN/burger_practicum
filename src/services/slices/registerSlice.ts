import { createAsyncThunk, createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { baseRegisterResponse } from "../../types/baseObjects";
import { IRegisterRequest, IRegisterResponse } from "../../types/types";
import { postRegisterService } from "../api/services";
import { RootState } from "../../store/store";

interface IRegister {
    registerData: IRegisterResponse;
    isRegisterLoading: boolean;
    isRegisterError: boolean;
}

const initialState: IRegister = {
    registerData: baseRegisterResponse,
    isRegisterLoading: false,
    isRegisterError: false,
}

export const postRegister = createAsyncThunk<IRegisterResponse, IRegisterRequest>(
    'postRegister',
    async (params, {rejectWithValue}) => {
        const response = await postRegisterService(params);

        if (!response.ok) {
            return rejectWithValue(true);
        }

        const data = await response.json();
        return data;
    }
)

const registerSlice = createSlice({
    name: 'registerSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postRegister.fulfilled, (state, action) => {
                state.registerData = action.payload;
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
            })
    }
});

// export const {
// } = orderSlice.actions;
export default registerSlice.reducer;

const registerData = (state: RootState) => state.registerSlice.registerData;
const isRegisterLoading = (state: RootState) => state.registerSlice.isRegisterLoading;
const isRegisterError = (state: RootState) => state.registerSlice.isRegisterError;

export const getStateRegisterData = createSelector(
    [registerData], registerData => registerData
);

export const getStateLoadingRegisterData = createSelector(
    [isRegisterLoading], isRegisterLoading => isRegisterLoading
);

export const getStateErrorRegisterData = createSelector(
    [isRegisterError], isRegisterError => isRegisterError
);
