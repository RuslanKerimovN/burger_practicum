import { IBurgerIngredients } from "../../types/types";
import { createAsyncThunk, createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getIngredientsServices } from '../api/services.ts';
import { RootState } from "../../store/store";

export interface IIngredients {
    ingredients: IBurgerIngredients[];
    isLoadingIngredients: boolean;
    isErrorIngredients: boolean;
}

const initialState: IIngredients = {
  ingredients: [],
  isLoadingIngredients: false,
  isErrorIngredients: false
};

export const getIngredients = createAsyncThunk<IBurgerIngredients[], undefined>(
  'getIngredients',
  async (_, { rejectWithValue }) => {
    const response = await getIngredientsServices();

    if (!response.ok) {
      return rejectWithValue(true);
    }

    return await response.json().then(res => res.data);
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredientsSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload.map((el) => {
          return { ...el,constructorId: `${Math.random()}` };
        });
        state.isLoadingIngredients = false;
        state.isErrorIngredients = false;
      })
      .addMatcher(isAnyOf(getIngredients.pending), (state) => {
        state.isLoadingIngredients = true;
        state.isErrorIngredients = false;
      })
      .addMatcher(isAnyOf(getIngredients.rejected), (state) => {
        state.isLoadingIngredients = false;
        state.isErrorIngredients = true;
      });
  }
});

// export const {
// } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;

const ingredients = (state: RootState) => state.ingredientsSlice.ingredients;
const isLoadingIngredients = (state: RootState) => state.ingredientsSlice.isLoadingIngredients;
const isErrorIngredients = (state: RootState) => state.ingredientsSlice.isErrorIngredients;

export const getStateIngredients = createSelector(
  [ingredients], ingredients => ingredients
);

export const getStateLoadingIngredients = createSelector(
  [isLoadingIngredients], isLoadingIngredients => isLoadingIngredients
);

export const getStateErrorIngredients = createSelector(
  [isErrorIngredients], isErrorIngredients => isErrorIngredients
);
