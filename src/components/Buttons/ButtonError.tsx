import { useEffect, useState } from 'react';

import './style.css';

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
