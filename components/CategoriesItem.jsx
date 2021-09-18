import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from '../styles/EventItem.module.css';

export default function CategoriesItem({ categories }) {
  return (
    <div className={styles.event}>
      <div className={styles.info}>
        <h3>{categories.name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/categories/${categories.slug}`}>
          <button type="button" className="btn">See More</button>
        </Link>
      </div>
    </div>
  );
}

CategoriesItem.propTypes = {
  categories: PropTypes.object.isRequired
};
