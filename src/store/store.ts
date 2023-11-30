import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import constructorSlice from '../services/slices/constructorSlice';
import ingredientsSlice from '../services/slices/ingredientsSlice';
import orderSlice from '../services/slices/orderSlice';
import showIngredientSlice from '../services/slices/showIngredientSlice';
import confirmationEmailSlice from '../services/slices/confirmationEmailSlice';
import resetPasswordSlice from '../services/slices/resetPasswordSlice';
import registerSlice from '../services/slices/registerSlice';
import loginSlice from '../services/slices/loginSlice';
import logoutSlice from '../services/slices/logoutSlice';
import updateTokenSlice from '../services/slices/updateTokenSlice';
import userSlice from '../services/slices/userSlice';
import {  socketMiddleware } from '../services/middleware/socket-middleware.ts';
import  feedSlice  from '../services/slices/feedSlice.ts';
import { wsActionsFeed, wsActionsHistoryOrders } from '../services/actions/web-socket-actions.ts';
import historyOrdersSlice from '../services/slices/historyOrdersSlice.ts';


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
  historyOrdersSlice
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
