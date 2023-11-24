import { useRouter } from 'next/router';

import styles from './Pagination.module.css';

interface Props {
  currentPage: string;
  nextPage: string | null | undefined;
  prevPage: string | null | undefined;
}

export default function Pagination({ currentPage, prevPage, nextPage }: Props) {
  const putPrevPage = () => {
    handlePageChange(prevPage ? prevPage.slice(prevPage.indexOf('=') + 1) : '1');
  };
  const putNextPage = () => {
    handlePageChange(nextPage ? nextPage.slice(nextPage.indexOf('=') + 1) : '1');
  };

  const router = useRouter();
  const handlePageChange = (page: string): void => {
    router.push({
      query: {
        page: page,
      },
    });
  };

  return (
    <div className={styles['pages']}>
      <button onClick={putPrevPage} disabled={!prevPage} data-testid='prev'>
        Prev
      </button>
      <span className={styles['pages__num']}>{currentPage}</span>
      <button onClick={putNextPage} disabled={!nextPage} data-testid='next'>
        Next
      </button>
    </div>
  );
}
