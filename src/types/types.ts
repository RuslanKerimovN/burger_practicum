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
  accessToken: string; //"Bearer ...",
  refreshToken: string;
}

export interface IAuthTokenRequest {
  email: string;
  password: string;
}

export interface IAuthTokenResponse {
  success: boolean;
  accessToken: string; //"Bearer ...",
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
  accessToken: string; //"Bearer ...",
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
