import { ChangeEvent, useState } from 'react';

import { useAppSelector } from '../../types/types';

interface Props {
  handleCountry: (value: string) => void;
}

export const AutoComplete = ({ handleCountry }: Props) => {
  const [search, setSearch] = useState({
    text: '',
    suggestions: [''],
  });
  const [isComponentVisible, setIsComponentVisible] = useState(true);

  const list = useAppSelector((state) => state.store.countryReducer);

  const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let suggestions = [''];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = list.filter((v: string) => regex.test(v));
    }
    setIsComponentVisible(true);
    setSearch({ suggestions, text: value });
  };

  const suggestionSelected = (value: string) => {
    setIsComponentVisible(false);
    setSearch({
      text: value,
      suggestions: [],
    });
    handleCountry(value);
  };

  const { suggestions } = search;
  return (
    <div>
      <div onClick={() => setIsComponentVisible(false)}></div>
      <input id='input' autoComplete='off' value={search.text} onChange={onTextChanged} />(
      {suggestions.length > 0 && isComponentVisible && (
        <ul>
          {suggestions.map((item: string, index) => (
            <li key={index}>
              <button key={index} onClick={() => suggestionSelected(item)}>
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
      )
    </div>
  );
};
