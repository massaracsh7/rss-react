import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import FormPage from './pages/FormPage/FormPage';
import HookFormPage from './pages/HookFormPage/HookFormPage';
import MainPage from './pages/MainPage/MainPage';
import Page404 from './pages/Page404/Page404';
import store from './store';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path='form' element={<FormPage />} />
            <Route path='hookform' element={<HookFormPage />} />
          </Route>
          <Route path='*' element={<Page404 />} />
        </Routes>
      </Provider>
    </>
  );
}
