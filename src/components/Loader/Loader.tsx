import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div className={styles['spinner']}>
      <p>Loading...</p>
      <div className={styles['circle']}></div>
    </div>
  );
}
