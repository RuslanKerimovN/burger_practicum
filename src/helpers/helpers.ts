import { IBurgerIngredients, IIngredientsArray } from "../types/types";

export const tabArray = (ingredients: IBurgerIngredients[]): IIngredientsArray[] => {
    let arrType1: IBurgerIngredients[] = [];
    let arrType2: IBurgerIngredients[] = [];
    let arrType3: IBurgerIngredients[] = [];

    for(let i = 0; i < ingredients.length; i++) {
        if (ingredients[i].type === 'bun') {
            arrType1 = [...arrType1, ingredients[i]];
        } else if (ingredients[i].type === 'main') {
            arrType2 = [...arrType2, ingredients[i]];
        } else if (ingredients[i].type === 'sauce') {
            arrType3 = [...arrType3, ingredients[i]];
        }
    }
    return [
        {header: 'Булки', body: arrType1},
        {header: 'Начинки', body: arrType2},
        {header: 'Соусы', body: arrType3}
    ];
}

export const findCount = (array: IBurgerIngredients[], name: string): number => {
    let count: number = 0;

    for (let i = 0; i < array.length; i++) {
        if (array[i].name === name) {
            count++;
        }
    }
    return count;
}