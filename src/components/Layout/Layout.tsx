import { ReactNode } from 'react';

import styles from '@/styles/Home.module.css';

import { PerPage } from '../../components/PerPage';
import { Search } from '../../components/Search';
import Header from '../Header/Header';

interface AppProps {
  children?: ReactNode;
}

const Layout: React.FC<AppProps> = ({ children }) => {
  return (
    <div className='container'>
      <div className='main-page'>
        <Header />
        <div className={styles['main__flex']}>
          <Search />
          <PerPage />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
