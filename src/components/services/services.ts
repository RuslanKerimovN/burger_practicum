const INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';
const POST_ORDER = 'https://norma.nomoreparties.space/api/orders';

export const getIngredients = () => {
    return fetch(INGREDIENTS)
        .then((response) => {
            if (response.ok) {return response.json()}
            return Promise.reject(`Ошибка ${response.status}`)
        })
        .then((data) => data.data);
};

export const postOrder = (order: string[]) => {
    return fetch(POST_ORDER, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ingredients: order})
    }).then((response) => {
        if(response.ok) {
            return response.json()}
        return Promise.reject(`Ошибка ${response.status}`)
    }).then((data) => data);
};
