import {
  IAuthTokenRequest,
  IPatchUserRequest,
  IRegisterRequest,
  IResetPasswordRequest
} from '../../types/types';

const ADDRESS = 'https://norma.nomoreparties.space/api';
const AUTH = `${ADDRESS}/auth`;

export const getIngredientsServices = (): Promise<Response> => {
  return fetch(`${ADDRESS}/ingredients`);
};

export const postOrderServices = (order: string[]): Promise<Response> => {
  return fetch(`${ADDRESS}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients: order })
  });
};

export const postConfirmationEmailServices = (email: string): Promise<Response> => {
  return fetch(`${ADDRESS}/password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
};

export const postPasswordResetServices = (params: IResetPasswordRequest): Promise<Response> => {
  return fetch(`${ADDRESS}/password-reset/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });
};

export const postLoginService = (params: IAuthTokenRequest): Promise<Response> => {
  return fetch(`${AUTH}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });
};

export const postRegisterService = (params: IRegisterRequest): Promise<Response> => {
  return fetch(`${AUTH}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });
};

export const postLogoutService = (token: string): Promise<Response> => {
  return fetch(`${AUTH}/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  });
};
 
export const postUpdateTokenService = (token: string): Promise<Response> => {
  return fetch(`${AUTH}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  });
};

export const getUserService = (cookie: string): Promise<Response> => {
  return fetch(`${AUTH}/user`, {
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${cookie}`
    }
  });
};

export const patchUserService = (cookie: string, params: IPatchUserRequest): Promise<Response> => {
  return fetch(`${AUTH}/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${cookie}`
    },
    body: JSON.stringify(params)
  });
};
