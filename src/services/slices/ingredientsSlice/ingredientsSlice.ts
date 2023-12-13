import { IBurgerIngredients } from '../../../types/types.ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsServices } from '../../api/services.ts';

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

    return await response.json().then((res) => res.data);
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredientsSlice',
  initialState,
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
      .addCase(getIngredients.pending, (state) => {
        state.isLoadingIngredients = true;
        state.isErrorIngredients = false;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.isLoadingIngredients = false;
        state.isErrorIngredients = true;
      });
  }
});

export default ingredientsSlice.reducer;
