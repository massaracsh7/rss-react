import { Key } from 'react';

import { DataForm, useAppSelector } from '../../types/types';

export default function MainPage() {
  const { cards } = useAppSelector((state) => state.store.storeReducer);
  return (
    <div className='main-page'>
      <h1>Main Page</h1>
      <ul className='cards__list' title='character list'>
        {cards.map((item: DataForm, index: Key | null | undefined) => (
          <li key={index}>
            {item.name}
            {item.age}
            {item.country}
            {item.email}
            {item.gender}
            <img src={item.picture} />{' '}
          </li>
        ))}
      </ul>
    </div>
  );
}
