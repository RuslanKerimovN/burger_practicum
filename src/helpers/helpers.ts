import { FORGOT_PASSWORD, HOME, LOGIN, PROFILE, PROFILE_TAPE, REGISTER, RESET_PASSWORD } from "../constants/path";
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

export const getIconType = (location: string, nav: string): 'primary' | 'secondary' => {
    if (location === HOME && nav === 'constructor') {
        return 'primary';
    } else if (location === PROFILE_TAPE && nav === 'tape') {
        return 'primary';
    } else if (location === PROFILE && nav === 'profile') {
        return 'primary';
    }
    return 'secondary';
}

export const getCookie = (name: string) => {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const setCookie = (name: string, value: string) => {
    let updatedCookie = `${name}=${value}`;
    document.cookie = updatedCookie;
}

export const deleteCookie = (name: string) => {
    document.cookie = `${name}=${''}; max-age: -1;`;
}

export const findRoute = (path: string): boolean => {
    const object = {
        [LOGIN]: true,
        [REGISTER]: true,
        [FORGOT_PASSWORD]: true,
        [RESET_PASSWORD]: true,
    }
    // @ts-ignore
    return object[path] ?? false;
}