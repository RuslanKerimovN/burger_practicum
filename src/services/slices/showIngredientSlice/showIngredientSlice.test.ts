import showIngredientSlice, {
  saveWatchIngredient,
  IShowIngredient
} from './showIngredientSlice.ts';
import { describe, expect, it } from 'vitest';
import { baseIngredient } from '../../../types/baseObjects.ts';

describe('Testing showIngredientSlice', () => {
  const initialState: IShowIngredient = { watchIngredient: baseIngredient };

  it('showIngredientSlice initialState', () => {
    const result = showIngredientSlice(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('saveWatchIngredient', () => {
    const action = {
      type: saveWatchIngredient.type,
      payload: { ...baseIngredient, _id: '1' }
    };
    const result = showIngredientSlice(initialState, action);
    expect(result).toEqual({ watchIngredient: { ...baseIngredient, _id: '1' } });
  });
});
