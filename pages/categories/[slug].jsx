import PropTypes from 'prop-types';
import Link from 'next/link';
import Layout from '../../components/Layout';
import CourseItem from '../../components/CourseItem';
import Pagination from '../../components/Pagination';
import { API_URL, PER_PAGE } from '../../config/index';

export default function CategoriesPage({
  courses, page, total, slug
}) {
  return (
    <Layout>
      <Link href="/categories">Go Back</Link>
      <h1>
        Courses in Category
        {' '}
        {slug}
      </h1>
      {courses.length === 0 && <h3>No courses to show</h3>}

      {courses.map((crs) => {
        return (
          <CourseItem key={crs.id} course={crs} />
        );
      })}

      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1, slug } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
  const total = 1;

  // Fetch courses
  const courseRes = await fetch(
    `${API_URL}api/v1/courses/category/${slug}?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const res = await courseRes.json();
  const courses = res.data || [];

  return {
    props: {
      courses, page: +page, total, slug
    },
  };
}

CategoriesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired
};