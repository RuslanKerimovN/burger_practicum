import {
  IAuthTokenResponse,
  IBurgerIngredients,
  ILogoutResponse,
  IOrderResponse,
  IRegisterResponse,
  IResetPasswordStatus,
  IUserResponse
} from './types';

export const baseOrder: IOrderResponse = {
  name: '',
  order: { number: 0 },
  success: false
};

export const baseIngredient: IBurgerIngredients = {
  _id: '',
  name: '',
  type: '',
  proteins: -1,
  fat: -1,
  carbohydrates: -1,
  calories: -1,
  price: -1,
  image: '',
  image_mobile: '',
  image_large: '',
  __v: -1,
  constructorId: ''
};

export const baseResetResponse: IResetPasswordStatus = {
  success: false,
  message: ''
};

export const baseRegisterResponse: IRegisterResponse = {
  success: false,
  user: {
    email: '',
    name: ''
  },
  accessToken: '', //"Bearer ...",
  refreshToken: ''
};

export const baseAuthToken: IAuthTokenResponse = {
  success: false,
  accessToken: '',
  refreshToken: '',
  user: {
    email: '',
    name: ''
  }
};

export const baseLogout: ILogoutResponse = {
  success: false,
  message: ''
};

export const baseUser: IUserResponse = {
  success: false,
  user: {
    email: '',
    name: ''
  }
};
