import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import CourseItem from '../components/CourseItem';
import Pagination from '../components/Pagination';
import { API_URL, PER_PAGE } from '../config/index';

export default function CoursesPage({ courses, page, total }) {
  return (
    <Layout>
      <h1>Courses</h1>
      {courses.length === 0 && <h3>No courses to show</h3>}

      {(courses || []).map((crs) => {
        return (
          <CourseItem key={crs.id} course={crs} />
        );
      })}

      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
  const total = 1;

  // Fetch courses
  const courseRes = await fetch(
    `${API_URL}/api/v1/courses?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const res = await courseRes.json();
  const courses = res.data || [];

  return {
    props: { courses, page: +page, total },
  };
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};