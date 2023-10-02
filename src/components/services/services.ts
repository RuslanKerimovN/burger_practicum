import { IBurgerIngredients } from "../../types/types";

const INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';

export const getIngredients = () => {
    return fetch(INGREDIENTS)
        .then((response) => {
            if (response.ok) {return response.json()}
            return Promise.reject(`Ошибка ${response.status}`)
        })
        .then((data) => data.data);
};
