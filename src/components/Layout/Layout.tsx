import { ReactNode } from 'react';

import Header from '../Header/Header';

interface AppProps {
  children?: ReactNode;
}

const Layout: React.FC<AppProps> = ({ children }) => {
  return (
    <div className='container'>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
