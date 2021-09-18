import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { API_URL } from '../../config/index';
import styles from '../../styles/Event.module.css';

export default function EventPage({ course }) {
  const router = useRouter();

  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(course.date).toLocaleDateString('en-US')}
          {' '}
          at
          {course.time}
        </span>
        <h1>{course.name}</h1>
        <ToastContainer />
        {course.image && (
          <div className={styles.image}>
            <Image
              src={course.image.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{course.performers}</p>
        <h3>Description:</h3>
        <p>{course.description}</p>
        <h3>
          Venue:
          {course.venue}
        </h3>
        <p>{course.address}</p>

        <Link href="/events">
          <span className={styles.back}>
            {'<'}
            {' '}
            Go Back
          </span>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();

  return {
    props: {
      evt: events[0],
    },
  };
}

EventPage.propTypes = {
  course: PropTypes.object.isRequired
};
