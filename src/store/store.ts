import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import constructorSlice from '../services/slices/constructorSlice';
import ingredientsSlice from "../services/slices/ingredientsSlice";
import orderSlice from '../services/slices/orderSlice';
import showIngredientSlice from '../services/slices/showIngredientSlice';

export const rootReducer = combineReducers({
    constructorSlice,
    ingredientsSlice,
    orderSlice,
    showIngredientSlice,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];