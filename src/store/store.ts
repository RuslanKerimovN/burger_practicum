import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import constructorSlice from '../services/slices/constructorSlice/constructorSlice.ts';
import ingredientsSlice from '../services/slices/ingredientsSlice/ingredientsSlice.ts';
import orderSlice from '../services/slices/orderSlice/orderSlice.ts';
import showIngredientSlice from '../services/slices/showIngredientSlice/showIngredientSlice.ts';
import confirmationEmailSlice from '../services/slices/confirmationEmailSlice/confirmationEmailSlice.ts';
import resetPasswordSlice from '../services/slices/resetPasswordSlice/resetPasswordSlice.ts';
import registerSlice from '../services/slices/registerSlice/registerSlice.ts';
import loginSlice from '../services/slices/loginSlice/loginSlice.ts';
import logoutSlice from '../services/slices/logoutSlice/logoutSlice.ts';
import updateTokenSlice from '../services/slices/updateTokenSlice/updateTokenSlice.ts';
import userSlice from '../services/slices/userSlice/userSlice.ts';
import {  socketMiddleware } from '../services/middleware/socket-middleware.ts';
import  feedSlice  from '../services/slices/feedSlice/feedSlice.ts';
import { wsActionsFeed, wsActionsHistoryOrders } from '../services/actions/web-socket-actions.ts';
import historyOrdersSlice from '../services/slices/historyOrdersSlice/historyOrdersSlice.ts';
import orderInfoSlice from '../services/slices/orderInfoSlice/orderInfoSlice.ts';

export const rootReducer = combineReducers({
  constructorSlice,
  ingredientsSlice,
  orderSlice,
  showIngredientSlice,
  confirmationEmailSlice,
  resetPasswordSlice,
  registerSlice,
  loginSlice,
  logoutSlice,
  updateTokenSlice,
  userSlice,
  feedSlice,
  historyOrdersSlice,
  orderInfoSlice
});

const feedMiddleware = socketMiddleware(wsActionsFeed);
const historyOrdersMiddleware  = socketMiddleware(wsActionsHistoryOrders);

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(feedMiddleware, historyOrdersMiddleware)
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
