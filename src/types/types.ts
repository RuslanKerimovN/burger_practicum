export interface IBurgerIngredients {
    _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IOrderResponse {
  name: string;
  order: {"number": number};
  success: boolean;
}

export const baseOrder: IOrderResponse = {
  name: '',
  order: {number: 0},
  success: false
}