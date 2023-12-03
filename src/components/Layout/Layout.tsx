import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';

export default function Layout() {
  return (
    <div className='container'>
      <Header />
      <main className='main'>
        <Outlet></Outlet>
      </main>
    </div>
  );
}
