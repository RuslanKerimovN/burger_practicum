import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import restaurantSlice from '../services/slices/restaurantSlice';

export const rootReducer = combineReducers({
    restaurantSlice,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];