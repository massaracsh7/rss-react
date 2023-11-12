import './style.css';

export default function ButtonError() {
  const createError = () => {
    throw new Error('Error was created');
  };

  return (
    <>
      <button className='button-error' onClick={createError}>
        Create Error
      </button>
    </>
  );
}
