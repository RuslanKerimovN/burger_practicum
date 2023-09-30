import { IBurgerIngredients } from "../types/types";

export const tabArray = (ingredients: IBurgerIngredients[]): IBurgerIngredients[][] => {
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
    return [arrType1, arrType2, arrType3];
}

export const header = (type: 'bun' | 'sauce' | 'main'): string => {
    const obj = {
        'bun': 'Булки',
        'sauce': 'Соусы',
        'main': 'Начинка'
    }
    return obj[type] ?? '';
}

export const cardArray = (type: 'bun' | 'sauce' | 'main', arrayMenu: IBurgerIngredients[][]): IBurgerIngredients[] => {
    const obj = {
        'bun': arrayMenu[0],
        'sauce': arrayMenu[1],
        'main': arrayMenu[2],
    }
    return obj[type] ?? [];
}