import { ReactNode } from 'react';

interface AppProps {
  children?: ReactNode;
}

const RootLayout: React.FC<AppProps> = ({ children }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default RootLayout;
