import { BASE_URL } from '../constants/constants';
import { CharacterAnswer } from '../mocks/CharacterListMock';
import {
  setBaseName,
  setCards,
  setCountItems,
  setCurrentPage,
  setLoading,
  setSearchData,
} from '../store/Slice';
import { store } from '../store/index';

describe('Redux state and actions', () => {
  test('get and updates countItems in store', () => {
    let state = store.getState().storeReducer;
    const count = state.countItems;
    expect(count).toBe(20);
    store.dispatch(setCountItems(5));
    state = store.getState().storeReducer;
    const countUpdate = state.countItems;
    expect(countUpdate).toBe(5);
  });

  test('get and updates searchData in store', () => {
    let state = store.getState().storeReducer;
    const search = state.searchData;
    expect(search).toBe('');
    store.dispatch(setSearchData('rick'));
    state = store.getState().storeReducer;
    const searchUpdate = state.searchData;
    expect(searchUpdate).toBe('rick');
  });

  test('get and updates searchData in store', () => {
    let state = store.getState().storeReducer;
    const search = state.searchData;
    expect(search).toBe((localStorage.getItem('textQuery') as string) ?? '');
    store.dispatch(setSearchData('morty'));
    state = store.getState().storeReducer;
    const searchUpdate = state.searchData;
    expect(searchUpdate).toBe('morty');
  });

  test('get and updates current page in store', () => {
    let state = store.getState().storeReducer;
    const page = state.pagination.pages;
    expect(page).toBe(1);
    store.dispatch(setCurrentPage(2));
    state = store.getState().storeReducer;
    const pageUpdate = state.pagination.pages;
    expect(pageUpdate).toBe(2);
  });

  test('get and updates set Cards in store', () => {
    let state = store.getState().storeReducer;
    const cards = state.cards;
    expect(cards.length).toBe(0);
    store.dispatch(setCards(CharacterAnswer.results));
    state = store.getState().storeReducer;
    const cardsUpdate = state.cards;
    expect(cardsUpdate.length).toBe(CharacterAnswer.results.length);
  });

  test('get and updates url in store', () => {
    let state = store.getState().storeReducer;
    const baseName = state.baseName;
    expect(baseName).toBe(BASE_URL);
    store.dispatch(setBaseName(`${BASE_URL}/page=2`));
    state = store.getState().storeReducer;
    const baseNameUpdate = state.baseName;
    expect(baseNameUpdate).toBe(`${BASE_URL}/page=2`);
  });

  test('get and updates url in store', () => {
    let state = store.getState().storeReducer;
    const loading = state.loading;
    expect(loading).toBe(false);
    store.dispatch(setLoading(true));
    state = store.getState().storeReducer;
    const loadingUpdate = state.loading;
    expect(loadingUpdate).toBe(true);
  });
});
