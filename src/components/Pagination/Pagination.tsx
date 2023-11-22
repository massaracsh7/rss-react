import { useEffect, useState } from 'react';

import { setCards, setCurrentPage } from '../../store/Slice';
import { useFetchCharacters } from '../../store/characterApi';
import { useAppDispatch, useAppSelector } from '../../types/types';
import styles from './Pagination.module.css';

export default function Pagination() {
  const { pagination, baseName, countItems } = useAppSelector((state) => state.storeReducer);
  const [page, setPage] = useState(baseName);
  const { data } = useFetchCharacters(page);
  const dispatch = useAppDispatch();

  const putPrevPage = () => {
    setPage(data?.info.prev ?? baseName);
    dispatch(setCurrentPage(pagination.pages - 1));
  };
  const putNextPage = () => {
    setPage(data?.info.next ?? baseName);
    dispatch(setCurrentPage(pagination.pages + 1));
  };

  useEffect(() => {
    dispatch(setCards(data?.results));
  }, [data?.results, dispatch]);

  useEffect(() => {
    setPage(baseName);
  }, [baseName, countItems]);

  return (
    <div className={styles['pages']}>
      <button onClick={putPrevPage} disabled={!data?.info.prev} data-testid='prev'>
        Prev
      </button>
      <span className={styles['pages__num']}>{pagination.pages}</span>
      <button onClick={putNextPage} disabled={!data?.info.next} data-testid='next'>
        Next
      </button>
    </div>
  );
}
