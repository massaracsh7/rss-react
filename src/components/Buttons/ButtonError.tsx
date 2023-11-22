import { useEffect, useState } from 'react';

import styles from './ButtonError.module.css';

export default function ButtonReload() {
  const [isError, setError] = useState(false);

  const createError = () => {
    setError(true);
  };

  useEffect(() => {
    const updateError = () => {
      if (isError) {
        throw new Error('Error was created');
        console.log(isError);
      } else {
        return;
      }
    };
    updateError();
  }, [isError]);

  return (
    <>
      <button className={styles['button-error']} onClick={createError}>
        Create Error
      </button>
    </>
  );
}
