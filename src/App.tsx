import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import DetailPage from './pages/DetailPage/DetailPage';
import MainPage from './pages/MainPage/MainPage';
import Page404 from './pages/Page404/Page404';
import { store } from './store/index';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<MainPage />}>
            <Route path='details=/:id' element={<DetailPage />} />
          </Route>
          <Route path='*' element={<Page404 />} />
        </Routes>
      </Provider>
    </>
  );
}
