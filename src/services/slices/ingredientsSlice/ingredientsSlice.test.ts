import ingredientsSlice, { IIngredients, getIngredients } from './ingredientsSlice.ts';
import { describe, expect, it, vi } from 'vitest';
import { getMockRequests } from '../../../helpers/testHelpers.ts';

describe('Testing ingredientsSlice', () => {
  const initialState: IIngredients = {
    ingredients: [],
    isLoadingIngredients: false,
    isErrorIngredients: false
  };

  it('ingredientsSlice initialState', () => {
    const result = ingredientsSlice(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should ingredientsSlice request fulfilled', async () => {
    const fetchMock = getMockRequests({
      ok: true,
      json: () => Promise.resolve({ data: [] })
    });
    vi.stubGlobal('fetch', fetchMock);

    const dispatch = vi.fn();
    const thunk = getIngredients();
    await thunk(dispatch, () => {}, {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('getIngredients/pending');
    expect(end[0].type).toBe('getIngredients/fulfilled');
    expect(end[0].payload).toEqual([]);
  });

  it('should ingredientsSlice request rejected', async () => {
    const fetchMock = getMockRequests({ ok: false });
    vi.stubGlobal('fetch', fetchMock);

    const dispatch = vi.fn();
    const thunk = getIngredients();
    await thunk(dispatch, () => {}, {} );

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('getIngredients/pending');
    expect(end[0].type).toBe('getIngredients/rejected');
    expect(end[0].payload).toEqual(true);
  });

  it('should ingredientsSlice extraReducers pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoadingIngredients: true
    });
  });

  it('should ingredientsSlice extraReducers fulfilled', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: []
    };
    const state = ingredientsSlice(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('should ingredientsSlice extraReducers rejected', () => {
    const action = { type: getIngredients.rejected.type };
    const state = ingredientsSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isErrorIngredients: true
    });
  });
});
