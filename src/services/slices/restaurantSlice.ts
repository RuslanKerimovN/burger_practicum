import { IBurgerIngredients, IOrderResponse, IRestaurant } from "../../types/types";
import {baseIngredient, baseOrder} from '../../types/baseObjects';
import { PayloadAction, createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getIngredientsServices, postOrderServices } from '../../services/api/services';

const initialState: IRestaurant = {
    ingredients: [],
    constructor: [],
    watchIngredient: baseIngredient,
    order: baseOrder,
    isLoading: false,
    isError: false,
}

export const getIngredients = createAsyncThunk<IBurgerIngredients[], undefined>(
    'getIngredients',
    async (_, {rejectWithValue}) => {
        const response = getIngredientsServices();

        if (!(await response).ok) {
            return rejectWithValue(true);
        }

        const data = (await response).json().then(res => res.data);
        return data;
    }
)

export const postOrder = createAsyncThunk<IOrderResponse, string[]>(
    'postOrder',
    async (array, {rejectWithValue}) => {
        const response = postOrderServices(array);

        if (!(await response).ok) {
            return rejectWithValue(true);
        }

        const data = (await response).json();
        return data;
    }
)

const restaurantSlice = createSlice({
    name: 'restaurantSlice',
    initialState: initialState,
    reducers: {
        saveWatchIngredient(state, action: PayloadAction<IBurgerIngredients>) {
            state.watchIngredient = action.payload;
        },
        deleteWatchIngredient(state) {
            state.watchIngredient = baseIngredient;
        },
        addIngredientInConstructor(state, action: PayloadAction<{ingredient: IBurgerIngredients, uniqId: string}>) {
            const {ingredient, uniqId} = action.payload;
            if (ingredient.type !== 'bun') {
                state.constructor.push({...ingredient, constructorId: uniqId});
                return;
            }

            const bunIndex = state.constructor.findIndex((el) => el.type === 'bun');
            if (bunIndex === -1) {
                state.constructor.push({...ingredient, constructorId: uniqId});
            } else {
                state.constructor.splice(bunIndex, 1, {...ingredient, constructorId: uniqId});
            }
        },
        deleteIngredientFromConstructor(state, action: PayloadAction<string>) {
            const index = state.constructor.findIndex((el) => el._id === action.payload);
            if (index >= 0) {
                state.constructor.splice(index, 1);
            }
        },
        moveIngredientInConstructor(state, action: PayloadAction<IBurgerIngredients[]>) {
            state.constructor = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIngredients.fulfilled, (state, action) => {
                state.ingredients = action.payload.map((el) => {
                    return {...el,constructorId: `${Math.random()}`};
                });
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(postOrder.fulfilled, (state, action) => {
                state.order = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addMatcher(isAnyOf(getIngredients.pending, postOrder.pending), (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addMatcher(isAnyOf(getIngredients.rejected, postOrder.rejected), (state) => {
                state.isLoading = false;
                state.isError = true;
            })
    }
});

export const {
    saveWatchIngredient,
    deleteWatchIngredient,
    addIngredientInConstructor,
    deleteIngredientFromConstructor,
    moveIngredientInConstructor
} = restaurantSlice.actions;
export default restaurantSlice.reducer;
