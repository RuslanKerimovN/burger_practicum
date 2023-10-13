import { IBurgerIngredients, IOrderResponse } from "./types"

export const baseOrder: IOrderResponse = {
    name: '',
    order: {number: 0},
    success: false
}

export const baseIngredient: IBurgerIngredients = {
    _id: '',
    name: '',
    type: '',
    proteins: -1,
    fat: -1,
    carbohydrates: -1,
    calories: -1,
    price: -1,
    image: '',
    image_mobile: '',
    image_large: '',
    __v: -1,
    constructorId: ''
}
