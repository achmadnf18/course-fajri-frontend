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
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossOrigin="anonymous" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossOrigin="anonymous" />
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