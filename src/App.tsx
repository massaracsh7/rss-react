import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ItemsContext, ItemsDefault } from './contexts/ItemsContext';
import { SearchContext, SearchDefault } from './contexts/SearchContext';
import DetailPage from './pages/DetailPage/DetailPage';
import MainPage from './pages/MainPage/MainPage';

export default function App() {
  const [searchData, setSearchData] = useState(SearchDefault);
  const [itemsData, setItemsData] = useState(ItemsDefault);

  return (
    <>
      <SearchContext.Provider
        value={{
          searchData,
          setSearchData,
        }}
      >
        <ItemsContext.Provider
          value={{
            itemsData,
            setItemsData,
          }}
        >
          <Routes>
            <Route path='/' element={<MainPage />}>
              <Route path='details=/:id' element={<DetailPage />} />
            </Route>
          </Routes>
        </ItemsContext.Provider>
      </SearchContext.Provider>
    </>
  );
}
