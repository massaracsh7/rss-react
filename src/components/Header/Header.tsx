import { ButtonError } from '../../components/Buttons';
import './style.css';

export default function Header() {
  return (
    <>
      <header className='header'>
        <ButtonError />
        <h1 className='header__title'>Rick & Morty Characters</h1>
      </header>
    </>
  );
}
