import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { API_URL, NEXT_URL } from '../config/index';
import API from '../utils/API';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => { return checkUserLoggedIn(); }, []);

  // Register user
  const register = async (usr) => {
    const res = await fetch(`${API_URL}api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usr),
    });

    const data = await res.json();

    if (res.ok) {
      router.push('/');
    } else {
      setError(data.error);
      setError(null);
    }
  };

  // Login user
  const login = async ({ email, password }) => {
    await API.post(`${API_URL}api/v1/auth/login`, { email, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        router.push('/');
      }).catch((err) => {
        setError('Authentication Failed');
        setError(null);
      });
  };

  // Logout user
  const logout = async () => {
    await API.post(`${API_URL}api/v1/auth/logout`).then((res) => {
      localStorage.removeItem('token');
      setUser(null);
      router.push('/');
    }).catch((err) => {
      setError(err.error);
      setError(null);
    });
  };

  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    await API.get(`${API_URL}api/v1/auth/checkToken`).then((res) => {
      if (!res.status) throw new Error('Session Expired');

      const jwt = localStorage.getItem('token');
      const userData = jwtDecode(jwt);

      setUser(userData);
    }).catch((err) => {
      setError('Session Expired');
      setUser(null);
      setError(null);
    });
  };

  return (
    <AuthContext.Provider value={{
      user, error, register, login, logout
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any.isRequired
};

export default AuthContext;
