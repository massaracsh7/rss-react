import { BASE_URL } from '../../constants/constants';
import { setBaseName, setCountItems, setCurrentPage } from '../../store/Slice';
import { useFetchCharacters } from '../../store/characterApi';
import { useAppDispatch, useAppSelector } from '../../types/types';
import styles from './PerPage.module.css';

export default function PerPage() {
  const dispatch = useAppDispatch();
  const { baseName } = useAppSelector((state) => state.storeReducer);

  const handleCountItems = (num: string) => {
    dispatch(setCountItems(num));
    dispatch(setBaseName(BASE_URL));
    dispatch(setCurrentPage(1));
  };
  useFetchCharacters(baseName);

  return (
    <select
      className={styles['count']}
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
