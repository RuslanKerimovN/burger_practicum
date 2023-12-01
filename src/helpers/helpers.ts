import {
  FORGOT_PASSWORD,
  HOME,
  LOGIN,
  PROFILE,
  FEED,
  REGISTER,
  RESET_PASSWORD
} from '../constants/path';
import { IBurgerIngredients, IIngredientsArray, IOrderStructure, TOrderImages } from '../types/types';

export const getTabs = (ingredients: IBurgerIngredients[]): IIngredientsArray[] => {
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

export const getPriceOneOrder = (orderIngredients: string[], ingredients: IBurgerIngredients[]): number => {
  let price: number = 0;

  for (let i = 0; i < orderIngredients.length; i++) {
    for (let j = 0; j < ingredients.length; j++) {
      if (ingredients[j]._id === orderIngredients[i]) {
        price += ingredients[j].price;
        break;
      }
    }
  }
  return price;
};

export const getStatus = (status: string): string => {
  if (status === 'created') {
    return 'Отменен';
  } else if (status === 'done') {
    return 'Готов';
  }
  return 'В работе';
};

export const getOrderStucture = (orderIngredient: string[], ingredients: IBurgerIngredients[]): IOrderStructure[] => {
  const orderStructue: IOrderStructure[] = [];

  for (const oneIngredient of orderIngredient) {
    const indexIngredient: number = ingredients.findIndex((el) => el._id === oneIngredient);
    const indexOrderStructueIngredient: number = orderStructue.findIndex((el) => el._id === oneIngredient);
    if (indexIngredient === -1) {
      return [];
    } else if (!orderStructue.length || indexOrderStructueIngredient === -1) {
      const { _id, name, price, image_mobile } = ingredients[indexIngredient];
      orderStructue.push({
        _id,
        image_mobile,
        name,
        priceIngredient: price,
        quantityOneIngredient: 1
      });
    } else {
      orderStructue[indexOrderStructueIngredient] = {
        ...orderStructue[indexOrderStructueIngredient],
        quantityOneIngredient: orderStructue[indexOrderStructueIngredient].quantityOneIngredient + 1
      };
    }
  }
  return orderStructue;
};

export const getOrderImages = (orderIngredient: string[], ingredients: IBurgerIngredients[]): TOrderImages[] => {
  const orderImages: TOrderImages[] = [];

  for (const oneIngredient of orderIngredient) {
    const indexIngredient: number = ingredients.findIndex((el) => el._id === oneIngredient);
    const indexOrderImages: number = orderImages.findIndex((el) => el._id === oneIngredient);
    if (indexIngredient === -1) {
      return [];
    } else if (!orderImages.length || indexOrderImages === -1) {
      const { image_mobile, _id, name } = ingredients[indexIngredient];
      orderImages.push({ _id, name, image_mobile, quantityOneIngredient: 1 });
    } else {
      orderImages[indexOrderImages] = {
        ...orderImages[indexOrderImages],
        quantityOneIngredient: orderImages[indexOrderImages].quantityOneIngredient + 1
      };
    }
  }
  return orderImages;
};
