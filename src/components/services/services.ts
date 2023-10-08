const ADDRESS = 'https://norma.nomoreparties.space/api';

export const getIngredients = () => {
    return fetch(`${ADDRESS}/ingredients`)
        .then((response) => {
            if (response.ok) {return response.json();}
            return Promise.reject(`Ошибка ${response.status}`);
        })
        .then((data) => data.data);
};

export const postOrder = (order: string[]) => {
    return fetch(`${ADDRESS}/orders`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ingredients: order})
    }).then((response) => {
        if(response.ok) {return response.json();}
        return Promise.reject(`Ошибка ${response.status}`);
    }).then((data) => data);
};
