import { ButtonError } from '../Buttons';
import './style.css';

export default function Header() {
  return (
    <>
      <header className='header'>
        <h1 className='header__title'>Rick & Morty Characters</h1>
        <ButtonError />
      </header>
    </>
  );
}
