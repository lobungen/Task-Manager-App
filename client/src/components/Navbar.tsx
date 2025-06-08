import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    setLoginCheck(auth.loggedIn());
  };

  useEffect(() => {
    checkLogin();
  }, []);

  // Theme state and toggle function
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className='nav'>
      <div className='nav-title'>
        <Link to='/'>Task Manager App</Link>
      </div>

      <ul className="nav-links">
        <li className="nav-item">
          <button onClick={toggleTheme} className="nav-btn">
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </li>
        {!loginCheck ? (
          <>
            <li className='nav-item'>
              <Link to='/login'>
                <button type='button' className="nav-btn">Login</button>
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/signup'>
                <button type='button' className="nav-btn">Sign Up</button>
              </Link>
            </li>
          </>
        ) : (
          <li className='nav-item'>
            <Link to='/profile'>
              <button type='button' className="nav-btn">Profile</button>
            </Link>
            <button type='button' onClick={() => auth.logout()} className="nav-btn">Logout</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;