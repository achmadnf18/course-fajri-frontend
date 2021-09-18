import qs from 'qs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout';
import CourseItem from '../../components/CourseItem';
import { API_URL, PER_PAGE } from '../../config/index';
import API from '../../utils/API';

export default function SearchPage({ courses }) {
  const router = useRouter();

  return (
    <Layout title="Search Results">
      <Link href="/courses">Go Back</Link>
      <h1>
        Search Results for
        {' '}
        {router.query.term}
      </h1>
      {courses.length === 0 && <h3>No courses to show</h3>}

      {courses.map((crs) => {
        return (
          <CourseItem key={crs.id} course={crs} />
        );
      })}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term, page = 1 } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
  const total = 1;

  // Fetch courses
  const courseRes = await fetch(
    `${API_URL}/api/v1/courses/discovery?s=${term}`
  );
  const res = await courseRes.json();
  const courses = res.data || [];

  return {
    props: { courses, page: +page, total },
  };
}

SearchPage.propTypes = {
  courses: PropTypes.array.isRequired
};
