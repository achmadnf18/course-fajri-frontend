import PropTypes from 'prop-types';
import Link from 'next/link';
import Layout from '../../components/Layout';
import CategoriesItem from '../../components/CategoriesItem';
import Pagination from '../../components/Pagination';
import { API_URL, PER_PAGE } from '../../config/index';

export default function CategoriesPage({ categories, page, total }) {
  return (
    <Layout>
      <Link href="/courses">{'< All Courses'}</Link>
      <h1>Categories</h1>
      {categories.length === 0 && <h3>No categories to show</h3>}

      {categories.map((crs) => {
        return (
          <CategoriesItem key={crs.id} categories={crs} />
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
    `${API_URL}api/v1/courses/category?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const res = await courseRes.json();
  const categories = res.data || [];

  return {
    props: { categories, page: +page, total },
  };
}

CategoriesPage.propTypes = {
  categories: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};