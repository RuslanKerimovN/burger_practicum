import { IBurgerIngredients } from "../../types/types";

const INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';

export const getIngredients = async () => {
    let ingredients: IBurgerIngredients[] = [];

    await fetch(INGREDIENTS)
        .then(response => response.json())
        .then(data => ingredients = data.data)
        .catch(() => console.log('Server error!'));

    return ingredients;
};