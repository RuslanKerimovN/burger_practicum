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
  constructorId: string;
}

export interface IOrderResponse {
  name: string;
  order: {"number": number};
  success: boolean;
}

export interface IRestaurant {
  ingredients: IBurgerIngredients[];
  constructor: IBurgerIngredients[];
  watchIngredient: IBurgerIngredients;
  order: IOrderResponse;
  isLoading: boolean;
  isError: boolean;
}

export interface IIngredientsArray {
  header: string;
  body: IBurgerIngredients[];
}