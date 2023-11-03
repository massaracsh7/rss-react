interface Props {
  nextPage: string | null | undefined;
  prevPage: string | null | undefined;
  putNextPage: () => void;
  putPrevPage: () => void;
  num: string;
}
export default function Pagination({ prevPage, nextPage, putNextPage, putPrevPage, num }: Props) {
  return (
    <div>
      {prevPage ? (
        <button onClick={putPrevPage}>Previous</button>
      ) : (
        <button disabled={true}>Prev</button>
      )}
      {num}
      {nextPage ? (
        <button onClick={putNextPage}>Next</button>
      ) : (
        <button disabled={true}>Next</button>
      )}
    </div>
  );
}
