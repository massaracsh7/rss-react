import { useEffect, useState } from 'react';

import './style.css';

export default function ButtonReload() {
  const [isError, setError] = useState(false);

  const createError = () => {
    setError(true);
  };

  useEffect(() => {
    const updateError = () => {
      console.log(isError);
      if (isError) {
        throw new Error('Error was created');
      }
    };
    updateError();
  }, [isError]);

  return (
    <>
      <button className='button-error' onClick={createError}>
        Create Error
      </button>
    </>
  );
}
