import { Key, useEffect, useState } from 'react';

import { DataForm, useAppSelector } from '../../types/types';
import './style.css';

export default function MainPage() {
  const { cards } = useAppSelector((state) => state.store.storeReducer);
  const [active, setActive] = useState<string>('cards__item');

  useEffect(() => {
    setActive('cards__item--active');
    setTimeout(() => {
      setActive('cards__item');
    }, 3000);
  }, []);

  return (
    <div className='main-page'>
      <h1 className='main__title'>Main Page</h1>
      <ul className='cards__list' title='character list'>
        {cards.map((item: DataForm, index: Key | null | undefined) => (
          <li key={index} className={index === cards.length - 1 ? active : 'cards__item'}>
            <img className='cards__img' src={item.picture} />
            <p>
              <b>Name:</b> {item.name}{' '}
            </p>
            <p>
              <b>Age:</b> {item.age}
            </p>
            <p>
              <b>Email:</b> {item.email}
            </p>
            <p>
              <b>Gender:</b> {item.gender}
            </p>
            <p>
              <b>Country:</b> {item.country}
            </p>
            <p>
              <b>Password:</b> {item.password}
            </p>
            <p>
              <b>ConfirmPassword:</b> {item.confirmPassword}
            </p>
            <p>
              <b>Accept T&C:</b> {item.accept ? 'yes' : 'no'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
