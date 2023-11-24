import { ReactNode } from 'react';

import { PerPage } from '../../components/PerPage';
import { Search } from '../../components/Search';
import Header from '../Header/Header';

interface AppProps {
  children?: ReactNode;
}

const Layout: React.FC<AppProps> = ({ children }) => {
  return (
    <div className='container'>
      <Header />
      <div className='main-page' title='main page'>
        <Search />
        <PerPage />
      </div>
      {children}
    </div>
  );
};

export default Layout;
