import { Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage/MainPage';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
    </Routes>
  );
}
