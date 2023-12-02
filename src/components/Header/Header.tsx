import { NavLink } from 'react-router-dom';

import './style.css';

export default function Header() {
  return (
    <header className='header'>
      <ul className='menu'>
        <li>
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to='/'>
            Main
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to='form'>
            Form
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to='hookform'>
            HookForm
          </NavLink>
        </li>
      </ul>
    </header>
  );
}
