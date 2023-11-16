import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { setCards, setCurrentPage } from '../../store/Slice';
import { useFetchCharacters } from '../../store/characterApi';
import { useAppDispatch, useAppSelector } from '../../types/types';
import './style.css';

export default function Pagination() {
  const { pagination, baseName } = useAppSelector((state) => state.storeReducer);
  const [page, setPage] = useState(baseName);
  const { data } = useFetchCharacters(page);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams(page.replace('https://rickandmortyapi.com/api/character', ''));
  }, [searchParams, setSearchParams, dispatch, page]);

  useEffect(() => {
    dispatch(setCards(data?.results));
  }, [data?.results, dispatch]);

  useEffect(() => {
    setPage(baseName);
  }, [baseName]);

  const putPrevPage = () => {
    setPage(data?.info.prev ?? baseName);
    dispatch(setCurrentPage(pagination.pages - 1));
  };
  const putNextPage = () => {
    setPage(data?.info.next ?? baseName);
    dispatch(setCurrentPage(pagination.pages + 1));
  };
  return (
    <div className='pages'>
      <button onClick={putPrevPage} disabled={!data?.info.prev} data-testid='prev'>
        Prev
      </button>
      <span className='pages__num'>{pagination.pages}</span>
      <button onClick={putNextPage} disabled={!data?.info.next} data-testid='next'>
        Next
      </button>
    </div>
  );
}
