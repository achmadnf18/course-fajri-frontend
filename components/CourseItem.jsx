import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from '../styles/EventItem.module.css';

export default function CourseItem({ course }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            course.upload_file_morph
              ? course.upload_file_morph.upload_file.url
              : '/images/course-default.png'
          }
          width={170}
          height={100}
        />
      </div>

      <div className={styles.info}>
        <span>
          {moment(course.created_at).format('DD MMM YYYY')}
          {' '}
          at
          {' '}
          {moment(course.created_at).format('HH:mm')}
        </span>
        <h3>{course.name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/courses/${course.id}`}>
          <button type="button" className="btn">Details</button>
        </Link>
      </div>
    </div>
  );
}

CourseItem.propTypes = {
  course: PropTypes.object.isRequired
};
