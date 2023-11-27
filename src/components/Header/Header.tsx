import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='header'>
      <ul className='menu'>
        <li>
          <Link to='/'>Main</Link>
        </li>
        <li>
          <Link to='form'>Form</Link>
        </li>
        <li>
          <Link to='hookform'>HookForm</Link>
        </li>
      </ul>
    </header>
  );
}
