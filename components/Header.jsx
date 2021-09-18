import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useContext } from 'react';
import Link from 'next/link';
import Search from './Search';
import AuthContext from '../context/AuthContext';
import styles from '../styles/Header.module.css';

export default function Header() {
  // const { user, logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          DJ Events
        </Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href="/events">
              Events
            </Link>
          </li>
          {/* {user ? (
            // If logged in
            <>
              <li>
                <Link href="/events/add">
                  Add Event
                </Link>
              </li>
              <li>
                <Link href="/account/dashboard">
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { return logout(); }}
                  className="btn-secondary btn-icon"
                >
                  <FaSignOutAlt />
                  {' '}
                  Logout
                </button>
              </li>
            </>
          ) : (
            // If logged out
            <>
              <li>
                <Link href="/account/login">
                  <button type="button" className="btn-secondary btn-icon">
                    <FaSignInAlt />
                    {' '}
                    Login
                  </button>
                </Link>
              </li>
            </>
          )} */}
        </ul>
      </nav>
    </header>
  );
}
