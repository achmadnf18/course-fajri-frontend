import PropTypes from 'prop-types';
import { AuthProvider } from '../context/AuthContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.any.isRequired,
};

export default MyApp;
