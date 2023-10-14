import { IBurgerIngredients } from "../../types/types";
import {baseIngredient } from '../../types/baseObjects';
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface IShowIngredient {
    watchIngredient: IBurgerIngredients,
}

const initialState: IShowIngredient = {
    watchIngredient: baseIngredient,
}

const showIngredientSlice = createSlice({
    name: 'showIngredientSlice',
    initialState: initialState,
    reducers: {
        saveWatchIngredient(state, action: PayloadAction<IBurgerIngredients>) {
            state.watchIngredient = action.payload;
        },
        deleteWatchIngredient(state) {
            state.watchIngredient = baseIngredient;
        },
        
    },
});

export const {
    saveWatchIngredient,
    deleteWatchIngredient,
} = showIngredientSlice.actions;
export default showIngredientSlice.reducer;

const watchIngredient = (state: RootState) => state.showIngredientSlice.watchIngredient;

export const getStateWatchIngredient = createSelector(
    [watchIngredient], watchIngredient => watchIngredient
);
