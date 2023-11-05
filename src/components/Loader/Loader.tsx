import './style.css';

export default function Loader() {
  return (
    <div className='spinner'>
      <p>Loading...</p>
      <div className='circle'></div>
    </div>
  );
}
