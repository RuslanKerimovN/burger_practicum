import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import constructorSlice from '../services/slices/constructorSlice';
import ingredientsSlice from "../services/slices/ingredientsSlice";
import orderSlice from '../services/slices/orderSlice';
import showIngredientSlice from '../services/slices/showIngredientSlice';
import confirmationEmailSlice from "../services/slices/confirmationEmailSlice";
import resetPasswordSlice from "../services/slices/resetPasswordSlice";

export const rootReducer = combineReducers({
    constructorSlice,
    ingredientsSlice,
    orderSlice,
    showIngredientSlice,
    confirmationEmailSlice,
    resetPasswordSlice
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];