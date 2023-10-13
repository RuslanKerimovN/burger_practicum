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
