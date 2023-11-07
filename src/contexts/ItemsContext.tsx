import { createContext } from 'react';

import { CharacterArray } from '../types/types';

export const ItemsDefault: CharacterArray = [];

interface ItemsContextInt {
  itemsData: CharacterArray;
  setItemsData: (data: CharacterArray) => void;
}

const itemsContext: ItemsContextInt = {
  itemsData: ItemsDefault,
  setItemsData: (data) => console.log(data),
};

export const ItemsContext = createContext(itemsContext);
