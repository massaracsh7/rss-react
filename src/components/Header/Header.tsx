import { ButtonError } from '../Buttons';
import styles from './Header.module.css';

export default function Header() {
  return (
    <>
      <header className={styles['header']}>
        <h1 className={styles['header__title']}>Rick & Morty Characters</h1>
        <ButtonError />
      </header>
    </>
  );
}
