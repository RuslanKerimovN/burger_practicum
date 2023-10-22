import { IResetPasswordRequest } from "../../types/types";

const ADDRESS = 'https://norma.nomoreparties.space/api';

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