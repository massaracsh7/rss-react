import { Key } from 'react';

import { DataForm, useAppSelector } from '../../types/types';
import './style.css';

export default function MainPage() {
  const { cards } = useAppSelector((state) => state.store.storeReducer);
  return (
    <div className='main-page'>
      <h1 className='main__title'>Main Page</h1>
      <ul className='cards__list' title='character list'>
        {cards.map((item: DataForm, index: Key | null | undefined) => (
          <li key={index} className='cards__item'>
            <img className='cards__img' src={item.picture} />
            <p>Name: {item.name} </p>
            <p>Age: {item.age}</p>
            <p>Email: {item.email}</p>
            <p>Gender: {item.gender}</p>
            <p>Country: {item.country}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
