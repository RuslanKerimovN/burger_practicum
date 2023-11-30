import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';

export interface IBurgerIngredients {
    _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  constructorId: string;
}

export interface IOrderResponse {
  name: string;
  order: {'number': number};
  success: boolean;
}

export interface IIngredientsArray {
  header: string;
  body: IBurgerIngredients[];
}

export interface IResetPasswordStatus {
  success: boolean;
  message: string;
}

export interface IResetPasswordRequest {
  password: string;
  token: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface IRegisterResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface IAuthTokenRequest {
  email: string;
  password: string;
}

export interface IAuthTokenResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  }
}

export interface IUpdateTokenRequest {
  token: string;
}

export interface IUpdateTokenResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface ILogoutResponse {
  success: boolean;
  message: string;
}

export interface IUserResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
  }
}

export interface IPatchUserRequest {
  name: string;
  email: string;
  password: string;
}

export enum WebSocketStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  CONNECTING = 'CONNECTING'
}

export interface ITapeOrders {
  success: boolean;
  orders: IOrders[],
  total: number;
  totalToday: number;
}

export interface IOrders {
  ingredients: string[],
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface IwsActionTypes {
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsSendMessage?: ActionCreatorWithPayload<unknown>;
  wsConnecting: ActionCreatorWithoutPayload;

  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<ITapeOrders>;
}
