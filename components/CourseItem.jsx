import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactStars from 'react-rating-stars-component';
import currency from 'currency.js';
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
        <ReactStars
          count={5}
          value={parseFloat(course.rating)}
          size={20}
          edit={false}
          isHalf
          emptyIcon={<i className="far fa-star" />}
          halfIcon={<i className="fa fa-star-half-alt" />}
          fullIcon={<i className="fa fa-star" />}
          activeColor="#ffd700"
        />
        <h3>
          {currency(course.price, { precision: '0', symbol: 'Rp. ' }).format()}
        </h3>
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
