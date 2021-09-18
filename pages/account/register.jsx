/* eslint-disable jsx-a11y/label-has-associated-control */
import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import AuthContext from '../../context/AuthContext';
import styles from '../../styles/AuthForm.module.css';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { register, error } = useContext(AuthContext);

  useEffect(() => { return error && toast.error(error); });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error('Passwords do not match!');
      return;
    }

    register({
      username, full_name: fullname, email, password
    });
  };

  return (
    <Layout title="User Registration">
      <div className={styles.auth}>
        <h1>
          <FaUser />
          {' '}
          Register
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => { return setUsername(e.target.value); }}
            />
          </div>
          <div>
            <label htmlFor="full_name">Full Name</label>
            <input
              type="text"
              id="full_name"
              value={fullname}
              onChange={(e) => { return setFullname(e.target.value); }}
            />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => { return setEmail(e.target.value); }}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => { return setPassword(e.target.value); }}
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => { return setPasswordConfirm(e.target.value); }}
            />
          </div>

          <input type="submit" value="Register" className="btn" />
        </form>

        <p>
          Already have an account?
          {' '}
          <Link href="/account/login">Login</Link>
        </p>
      </div>
    </Layout>
  );
}
