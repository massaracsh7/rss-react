import { ReactElement } from 'react';

import styles from '@/styles/Home.module.css';
import { useAppSelector } from '@/types/types';

import CardsList from '../CardsList/CardsList';
import Pagination from '../Pagination/Pagination';

interface AppProps {
  children?: ReactElement;
}

const DetailLayout: React.FC<AppProps> = ({ children }) => {
  const { cards, pagination } = useAppSelector((state) => state.storeReducer);
  const current = String(pagination.pages);
  return (
    <>
      <div className={styles['main__flex']}>
        <Pagination currentPage={current} prevPage={pagination.prev} nextPage={pagination.next} />
      </div>
      <div className={styles['main__flex']}>
        <CardsList cards={cards} />
        {children}
      </div>
    </>
  );
};

export default DetailLayout;
