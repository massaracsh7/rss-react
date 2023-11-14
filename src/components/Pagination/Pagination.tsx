import { fetchNext, fetchPrev } from '../../store/Slice';
import { useAppDispatch, useAppSelector } from '../../types/types';
import './style.css';

export default function Pagination() {
  const dispatch = useAppDispatch();

  const { pagination } = useAppSelector((state) => state.store);
  const putPrevPage = () => {
    dispatch(fetchPrev(pagination.prev!));
  };
  const putNextPage = () => {
    dispatch(fetchNext(pagination.next!));
  };
  return (
    <div className='pages'>
      <button onClick={putPrevPage} disabled={!pagination.prev} data-testid='prev'>
        Prev
      </button>
      <span className='pages__num'>{pagination.pages}</span>
      <button onClick={putNextPage} disabled={!pagination.next} data-testid='next'>
        Next
      </button>
    </div>
  );
}
