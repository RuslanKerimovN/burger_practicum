import { PayloadAction, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { baseUser } from "../../types/baseObjects";
import { IPatchUserRequest, IUserResponse } from "../../types/types";
import { getUserService, patchUserService, postUpdateTokenService } from "../api/services";
import { RootState } from "../../store/store";
import { getCookie, setCookie } from "../../helpers/helpers";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/constants";

interface IUserInfo {
    user: IUserResponse;
    userEmail: string;
    userName: string;
    userPassword: string;

    name: string;
    email: string;
    password: string;

    isChangeData: boolean;

    isLoadingUser: boolean;
    isErrorUser: boolean;

    isPatchLoadingUser: boolean;
    isPatchErrorUser: boolean;
}

const initialState: IUserInfo = {
    user: baseUser,
    userEmail: '',
    userName: '',
    userPassword: '',

    name: '',
    email: '',
    password: '',

    isChangeData: false,

    isLoadingUser: false,
    isErrorUser: false,

    isPatchLoadingUser: false,
    isPatchErrorUser: false
}

export const patchUser = createAsyncThunk<IUserResponse, IPatchUserRequest>(
    'patchUser',
    async (params, {rejectWithValue}) => {
        let cookie = getCookie(ACCESS_TOKEN);
        const token = localStorage.getItem(REFRESH_TOKEN);
        let response;

        if (!cookie || !token) {
            return rejectWithValue(true);
        }

        response = await patchUserService(cookie, params);
        if (response.ok) {
            return response.json();
        }

        const tmp = await response.json();

        if (tmp.message === 'jwt expired') {
            const res = await postUpdateTokenService(token);

            if (!res.ok) {
                return rejectWithValue(true);
            }

            const tmp = await res.json();
            await localStorage.setItem(REFRESH_TOKEN, `${(tmp.refreshToken)}`);
            await setCookie(ACCESS_TOKEN, `${(tmp.accessToken).split('Bearer ')[1]}`);
        } else {
            return await response.json();
        }

        cookie = await getCookie(ACCESS_TOKEN);

        if (!cookie) {
            return rejectWithValue(true);
        }

        response = await patchUserService(cookie, params);
        if (!response.ok) {
            return rejectWithValue(true);
        }

        return await response.json();
    }
)

export const getUser = createAsyncThunk<IUserResponse, undefined>(
    'getUser',
    async (_, {rejectWithValue}) => {
        let cookie = getCookie(ACCESS_TOKEN);
        const token = localStorage.getItem(REFRESH_TOKEN);
        let response;

        if (!cookie || !token) {
            return rejectWithValue(true);
        }

        response = await getUserService(cookie);
        if (response.ok) {
            return response.json();
        }

        const tmp = await response.json();

        if (tmp && tmp.message === 'jwt expired') {
            const res = await postUpdateTokenService(token);
            if (!res.ok) {
                return rejectWithValue(true);
            }

            const tmp = await res.json();
            await localStorage.setItem(REFRESH_TOKEN, `${(tmp.refreshToken)}`);
            await setCookie(ACCESS_TOKEN, `${(tmp.accessToken).split('Bearer ')[1]}`);
        } else {
            return await response.json();
        }

        cookie = await getCookie(ACCESS_TOKEN);
        if (!cookie) {
            return rejectWithValue(true);
        }

        response = await getUserService(cookie);
        if (!response.ok) {
            return rejectWithValue(true);
        }

        return await response.json();
        }
)

const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialState,
    reducers: {
        setUserEmail(state, action: PayloadAction<string>) {
            if (!state.isChangeData) {
                state.isChangeData = true;
            }
            state.userEmail = action.payload;
        },
        setUserName(state, action: PayloadAction<string>) {
            if (!state.isChangeData) {
                state.isChangeData = true;
            }
            state.userName = action.payload;
        },
        setUserPassword(state, action: PayloadAction<string>) {
            if (!state.isChangeData) {
                state.isChangeData = true;
            }
            state.userPassword = action.payload;
        },
        resetChanges(state) {
            state.isChangeData = false;
            state.userName = state.name;
            state.userEmail = state.email;
            state.userPassword = state.password;
        },
        deleteUser(state) {
            state.user = baseUser;
            state.userName = '';
            state.userEmail = '';
            state.userPassword = '';
            state.name = '';
            state.email = '';
            state.password = '';
            state.isChangeData = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.name = action.payload.user.name;
                state.email = action.payload.user.email;
                state.password = '';
                state.userEmail = action.payload.user.email;
                state.userName = action.payload.user.name;
                state.isLoadingUser = false;
                state.isErrorUser = false;
            })
            .addCase(patchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.userEmail = action.payload.user.email;
                state.userName = action.payload.user.name;
                state.name = action.payload.user.name;
                state.email = action.payload.user.email;
                state.userPassword = '';
                state.isPatchLoadingUser = false;
                state.isPatchErrorUser = false;
            })
            .addCase(getUser.pending, (state) => {
                state.isLoadingUser = true;
                state.isErrorUser = false;
            })
            .addCase(getUser.rejected, (state) => {
                state.isLoadingUser = false;
                state.isErrorUser = true;
            })
            .addCase(patchUser.pending, (state) => {
                state.isPatchLoadingUser = true;
                state.isPatchErrorUser = false;
            })
            .addCase(patchUser.rejected, (state) => {
                state.isPatchLoadingUser = false;
                state.isPatchErrorUser = true;
            })
    }
});

export const {
    setUserEmail,
    setUserName,
    setUserPassword,
    resetChanges,
    deleteUser
} = userSlice.actions;
export default userSlice.reducer;

const user = (state: RootState) => state.userSlice.user;
const userEmail = (state: RootState) => state.userSlice.userEmail;
const userName = (state: RootState) => state.userSlice.userName;
const userPassword = (state: RootState) => state.userSlice.userPassword;
const isLoadingUser = (state: RootState) => state.userSlice.isLoadingUser;
const isErrorUser = (state: RootState) => state.userSlice.isErrorUser;
const isPatchLoadingUser = (state: RootState) => state.userSlice.isPatchLoadingUser;
const isPatchErrorUser = (state: RootState) => state.userSlice.isPatchErrorUser;
const isChangeData = (state: RootState) => state.userSlice.isChangeData;
const name = (state: RootState) => state.userSlice.name;

export const getStateUser = createSelector(
    [user], user => user
);

export const getStateUserEmail = createSelector(
    [userEmail], userEmail => userEmail
);

export const getStateUserName = createSelector(
    [userName], userName => userName
);

export const getStateUserPassword = createSelector(
    [userPassword], userPassword => userPassword
);

export const getStateLoadingUser = createSelector(
    [isLoadingUser], isLoadingUser => isLoadingUser
);

export const getStateErrorUser = createSelector(
    [isErrorUser], isErrorUser => isErrorUser
);

export const getStatePatchLoadingUser = createSelector(
    [isPatchLoadingUser], isPatchLoadingUser => isPatchLoadingUser
);

export const getStatePatchErrorUser = createSelector(
    [isPatchErrorUser], isPatchErrorUser => isPatchErrorUser
);

export const getStateIsChangeData = createSelector(
    [isChangeData], isChangeData => isChangeData
);

export const getStateName = createSelector(
    [name], name => name
);
