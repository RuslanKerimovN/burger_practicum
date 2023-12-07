import constructorSlice, {
  addIngredientInConstructor,
  deleteIngredientFromConstructor,
  moveIngredientInConstructor,
  IConstructor
} from './constructorSlice.ts';
import { describe, expect, it } from 'vitest';
import { baseIngredient } from '../../../types/baseObjects.ts';

describe('Тестирование constructorSlice', () => {
  it('constructorSlice начальное значение', () => {
    const initialState: IConstructor = { constructor: [] };

    const result = constructorSlice(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('addIngredientInConstructor', () => {
    const initialState: IConstructor = { constructor: [] };

    const action = {
      type: addIngredientInConstructor.type,
      payload: { ingredient: baseIngredient, uniqId: '1' }
    };
    const result = constructorSlice(initialState, action);
    expect(result).toEqual({ constructor: [{ ...baseIngredient, constructorId: '1' }] });

    const actionWithBun = {
      type: addIngredientInConstructor.type,
      payload: { ingredient: { ...baseIngredient, type: 'bun' }, uniqId: '2' }
    };
    const resultWithBun = constructorSlice(result, actionWithBun);
    expect(resultWithBun).toEqual({ constructor: [
      { ...baseIngredient, type: 'bun', constructorId: '2' },
      { ...baseIngredient, constructorId: '1' }
    ] });
  });

  it('deleteIngredientFromConstructor', () => {
    const initialState: IConstructor = { constructor: [
      { ...baseIngredient, _id: '1' },
      { ...baseIngredient, _id: '2' }
    ] };

    const action = {
      type: deleteIngredientFromConstructor.type,
      payload: '1'
    };
    const result = constructorSlice(initialState, action);
    expect(result).toEqual({ constructor: [{ ...baseIngredient, _id: '2' }] });
  });

  it('moveIngredientInConstructor', () => {
    const initialState: IConstructor = { constructor: [{ ...baseIngredient, _id: '1' }] };

    const action = {
      type: moveIngredientInConstructor.type,
      payload: [{ ...baseIngredient, _id: '2' }]
    };
    const result = constructorSlice(initialState, action);
    expect(result).toEqual({ constructor: [{ ...baseIngredient, _id: '2' }] });
  });
});
