import { setCountItems } from '../../store/Slice';
import { useAppDispatch } from '../../types/types';
import './style.css';

export default function PerPage() {
  const dispatch = useAppDispatch();
  const handleCountItems = (num: string) => {
    dispatch(setCountItems(num));
  };
  return (
    <select
      className='count'
      onChange={(event) => handleCountItems(event.target.value)}
      data-testid='per-page'
    >
      <option value='20'>20</option>
      <option value='15'>15</option>
      <option value='10'>10</option>
      <option value='5'>5</option>
    </select>
  );
}
