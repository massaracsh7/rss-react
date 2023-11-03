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
      {prevPage ? (
        <button onClick={putPrevPage}>Prev</button>
      ) : (
        <button disabled={true}>Prev</button>
      )}
      <span className='pages__num'>{num}</span>
      {nextPage ? (
        <button onClick={putNextPage}>Next</button>
      ) : (
        <button disabled={true}>Next</button>
      )}
    </div>
  );
}
