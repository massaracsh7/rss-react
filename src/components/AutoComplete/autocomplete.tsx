import { ChangeEvent, useState } from 'react';

import { useAppSelector } from '../../types/types';
import './style.css';

interface Props {
  handleCountry: (value: string) => void;
}

export const AutoComplete = ({ handleCountry }: Props) => {
  const [search, setSearch] = useState({
    text: '',
    arr: [''],
  });
  const [isOpen, setIsOpen] = useState(true);

  const list = useAppSelector((state) => state.store.countryReducer);

  const printText = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let arr = [''];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      arr = list.filter((v: string) => regex.test(v));
    }
    setIsOpen(true);
    setSearch({ arr, text: value });
  };

  const selectCountry = (value: string) => {
    setIsOpen(false);
    setSearch({
      text: value,
      arr: [],
    });
    handleCountry(value);
  };

  const { arr } = search;
  return (
    <div className='country__wrapper'>
      <input
        className='country__input'
        id='input'
        autoComplete='off'
        value={search.text}
        onChange={printText}
      />
      {arr.length > 0 && isOpen && (
        <ul className='country__list'>
          {arr.map((item: string, index) => (
            <li key={index}>
              <button className='country__item' key={index} onClick={() => selectCountry(item)}>
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
