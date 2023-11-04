import { Route, Routes } from 'react-router-dom';

import DetailPage from './pages/DetailPage/DetailPage';
import MainPage from './pages/MainPage/MainPage';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />}>
        <Route path='details=/:id' element={<DetailPage />} />
      </Route>
    </Routes>
  );
}
