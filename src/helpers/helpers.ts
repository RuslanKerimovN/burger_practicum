import {
  FORGOT_PASSWORD,
  HOME,
  LOGIN,
  PROFILE,
  FEED,
  REGISTER,
  RESET_PASSWORD
} from '../constants/path';
import { IBurgerIngredients, IIngredientsArray } from '../types/types';

export const tabArray = (ingredients: IBurgerIngredients[]): IIngredientsArray[] => {
  let bun: IBurgerIngredients[] = [];
  let main: IBurgerIngredients[] = [];
  let sauce: IBurgerIngredients[] = [];

  for(let i = 0; i < ingredients.length; i++) {
    if (ingredients[i].type === 'bun') {
      bun = [...bun, ingredients[i]];
    } else if (ingredients[i].type === 'main') {
      main = [...main, ingredients[i]];
    } else if (ingredients[i].type === 'sauce') {
      sauce = [...sauce, ingredients[i]];
    }
  }
  return [
    { header: 'Булки', body: bun },
    { header: 'Начинки', body: main },
    { header: 'Соусы', body: sauce }
  ];
};

export const findCount = (array: IBurgerIngredients[], name: string): number => {
  let count: number = 0;

  for (let i = 0; i < array.length; i++) {
    if (array[i].name === name) {
      count++;
    }
  }
  return count;
};

export const getIconType = (location: string, nav: string): 'primary' | 'secondary' => {
  if (location === HOME && nav === 'constructor') {
    return 'primary';
  } else if (location === FEED && nav === 'tape') {
    return 'primary';
  } else if (location === PROFILE && nav === 'profile') {
    return 'primary';
  }
  return 'secondary';
};

export const getCookie = (name: string): string | undefined => {
  const matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name: string, value: string): void => {
  document.cookie = `${name}=${value}`;
};

export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=${''}; max-age: -1;`;
};

export const findRoute = (path: string): boolean => {
  const routesArray: string[] = [
    LOGIN,
    REGISTER,
    FORGOT_PASSWORD,
    RESET_PASSWORD
  ];
  return routesArray.includes(path);
};
