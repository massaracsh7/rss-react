import './style.css';

interface PropsSearch {
  setSearch: (searchStr: string) => void;
  search: string;
  handleSubmit: () => void;
}
export default function SearchInput({ setSearch, search, handleSubmit }: PropsSearch) {
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch((e.target as HTMLInputElement).value.toLowerCase().trim());
  };
  return (
    <>
      <form className='search__form' onSubmit={handleSubmit}>
        <input
          className='search__input'
          autoFocus
          type='search'
          value={search}
          onChange={handleChange}
          data-testid='search'
        />
        <button type='submit' data-testid='submit'>
          🔍
        </button>
      </form>
    </>
  );
}
