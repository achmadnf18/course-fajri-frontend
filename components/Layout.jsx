import Head from 'next/head';
import PropTypes from 'prop-types';
import { useRouter } from 'next/dist/client/router';

import Header from './Header';
import Footer from './Footer';
import Showcase from './Showcase';
import styles from '../styles/Layout.module.css';

export default function Layout({
  title, keywords, description, children
}) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />
      {router.pathname === '/' && <Showcase />}
      <div className={styles.container}>
        {children}
      </div>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  children: PropTypes.any
};

Layout.defaultProps = {
  title: 'Course Fajri | Find the courses you needed',
  description: 'Find the best lecturer',
  keywords: 'android, flutter, react, nodejs',
  children: ''
};