import { ReactElement } from 'react';

import { useAppSelector } from '@/types/types';

import CardsList from '../CardsList/CardsList';
import Pagination from '../Pagination/Pagination';

interface AppProps {
  children?: ReactElement;
}

const DetailLayout: React.FC<AppProps> = ({ children }) => {
  const { cards } = useAppSelector((state) => state.storeReducer);
  return (
    <div>
      <Pagination currentPage={'1'} prevPage={''} nextPage={''} />
      <CardsList cards={cards} />
      {children}
    </div>
  );
};

export default DetailLayout;
