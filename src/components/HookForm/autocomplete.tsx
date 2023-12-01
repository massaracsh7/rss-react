import { ChangeEvent, useState } from 'react';

import countryList from '../../store/list';

export const AutoComplete = () => {
  const [search, setSearch] = useState({
    text: '',
    suggestions: [''],
  });
  const [isComponentVisible, setIsComponentVisible] = useState(true);

  const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let suggestions: string[] = [''];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = countryList.sort().filter((v: string) => regex.test(v));
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
  };

  const { suggestions } = search;

  return (
    <>
      <div onClick={() => setIsComponentVisible(false)}></div>
      <input
        id='input'
        autoComplete='off'
        value={search.text}
        onChange={onTextChanged}
        type={'text'}
      />
      (
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
    </>
  );
};
