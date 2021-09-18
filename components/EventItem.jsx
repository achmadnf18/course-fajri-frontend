import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import styles from '../styles/EventItem.module.css';

export default function EventItem({ course }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            course.image
              ? course.image.formats.thumbnail.url
              : '/images/event-default.png'
          }
          width={170}
          height={100}
        />
      </div>

      <div className={styles.info}>
        <span>
          {new Date(course.date).toLocaleDateString('en-US')}
          {' '}
          at
          {course.time}
        </span>
        <h3>{course.name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${course.slug}`}>
          <button type="button" className="btn">Details</button>
        </Link>
      </div>
    </div>
  );
}

EventItem.propTypes = {
  course: PropTypes.object.isRequired
};
