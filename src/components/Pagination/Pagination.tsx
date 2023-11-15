import { useState } from 'react';

import { API_URL } from '../../constants/constants';
import { setCurrentPage } from '../../store/Slice';
import { Character, PageNumber, useAppDispatch, useAppSelector } from '../../types/types';
import { userApi } from '../../utils/UserService';
import './style.css';

export default function Pagination() {
  const [page, setPage] = useState(`${API_URL}`);
  const { pagination } = useAppSelector(
    (state: {
      storeReducer: {
        isLoading: boolean;
        cards: Character[];
        pagination: { AllPages: number; pages: number; next: PageNumber; prev: PageNumber };
        searchData: string;
        countItems: number;
      };
    }) => state.storeReducer,
  );
  const { data } = userApi.useGetCharactersQuery(page);
  const dispatch = useAppDispatch();

  const putPrevPage = () => {
    setPage(data?.info.prev ?? `${API_URL}`);
    dispatch(setCurrentPage(pagination.pages - 1));
  };
  const putNextPage = () => {
    setPage(data?.info.next ?? `${API_URL}`);
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
