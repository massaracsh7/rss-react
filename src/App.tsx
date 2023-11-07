import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { SearchContext, SearchDefault } from './contexts/SearchContext';
import DetailPage from './pages/DetailPage/DetailPage';
import MainPage from './pages/MainPage/MainPage';

export default function App() {
  const [searchData, setSearchData] = useState(SearchDefault);

  return (
    <>
      <SearchContext.Provider
        value={{
          searchData,
          setSearchData,
        }}
      >
        <Routes>
          <Route path='/' element={<MainPage />}>
            <Route path='details=/:id' element={<DetailPage />} />
          </Route>
        </Routes>
      </SearchContext.Provider>
    </>
  );
}
