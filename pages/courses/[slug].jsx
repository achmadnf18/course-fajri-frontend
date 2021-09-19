import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import moment from 'moment';
import currency from 'currency.js';
import ReactStars from 'react-rating-stars-component';
import 'react-toastify/dist/ReactToastify.css';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { API_URL } from '../../config/index';
import styles from '../../styles/Event.module.css';

export default function CoursePage({ course }) {
  const router = useRouter();

  let imageFormats = course.upload_file_morph ? course.upload_file_morph.upload_file.formats : null;
  if (typeof imageFormats !== 'object' && imageFormats != null) imageFormats = JSON.parse(imageFormats);

  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {moment(course.created_at).format('DD MMM YYYY')}
          {' '}
          at
          {' '}
          {moment(course.created_at).format('HH:mm')}
        </span>
        <h1>{course.name}</h1>
        <ToastContainer />
        {imageFormats && (
          <div className={styles.image}>
            <Image
              src={imageFormats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Instructor:</h3>
        <p>{course.instructor}</p>
        <h3>Description:</h3>
        <p>{course.description}</p>
        <h3>
          {currency(course.price, { precision: '0', symbol: 'Rp. ' }).format()}
        </h3>
        <ReactStars
          count={5}
          value={parseFloat(course.rating)}
          size={24}
          edit={false}
          isHalf
          emptyIcon={<i className="far fa-star" />}
          halfIcon={<i className="fa fa-star-half-alt" />}
          fullIcon={<i className="fa fa-star" />}
          activeColor="#ffd700"
        />

        <Link href="/">
          <a className={styles.back}>
            {'<'}
            {' '}
            Go Back
          </a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  const courseRes = await fetch(`${API_URL}api/v1/courses/detail/${slug}`);
  const res = await courseRes.json();
  const courses = res.data || {};

  return {
    props: {
      course: courses,
    },
  };
}

CoursePage.propTypes = {
  course: PropTypes.object.isRequired
};
