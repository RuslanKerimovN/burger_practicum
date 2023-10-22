import { IAuthTokenRequest, IRegisterRequest, IResetPasswordRequest } from "../../types/types";

const ADDRESS = 'https://norma.nomoreparties.space/api';
const AUTH = `${ADDRESS}/auth`;

export const getIngredientsServices = () => {
    return fetch(`${ADDRESS}/ingredients`);
};

export const postOrderServices = (order: string[]) => {
    return fetch(`${ADDRESS}/orders`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ingredients: order})
    });
};

export const postConfirmationEmailServices = (email: string) => {
    return fetch(`${ADDRESS}/password-reset`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email})
    });
};

export const postPasswordResetServices = (params: IResetPasswordRequest) => {
    return fetch(`${ADDRESS}/password-reset/reset`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params)
    });
};

export const postLoginService = (params: IAuthTokenRequest) => {
    return fetch(`${AUTH}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params)
    });
}

export const postRegisterService = (params: IRegisterRequest) => {
    return fetch(`${AUTH}/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params)
    });
}

export const postLogoutService = (token: string) => {
    return fetch(`${AUTH}/logout`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token})
    });
}
 
export const postUpdateTokenService = (params: IAuthTokenRequest) => {
    return fetch(`${AUTH}/token`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params)
    });
}