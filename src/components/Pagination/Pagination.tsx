import './style.css';

interface Props {
  nextPage: string | null | undefined;
  prevPage: string | null | undefined;
  putNextPage: () => void;
  putPrevPage: () => void;
  num: string;
}
export default function Pagination({ prevPage, nextPage, putNextPage, putPrevPage, num }: Props) {
  return (
    <div className='pages'>
      <button onClick={putPrevPage} disabled={!prevPage}>
        Prev
      </button>
      <span className='pages__num'>{num}</span>
      <button onClick={putNextPage} disabled={!nextPage}>
        Next
      </button>
    </div>
  );
}
