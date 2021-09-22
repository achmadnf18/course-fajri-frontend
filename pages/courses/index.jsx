import PropTypes from 'prop-types';
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import Layout from '../../components/Layout';
import CourseItem from '../../components/CourseItem';
import Pagination from '../../components/Pagination';
import { API_URL, PER_PAGE } from '../../config/index';
import styles from '../../styles/Courses.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CoursesPage({ courses, page, total, _sortBy, _sortType }) {
  const [sortBy, setSortBy] = useState(_sortBy);

  const router = useRouter();

  const handleSort = (e, sort, by, type) => {
    e.preventDefault();
    router.push(`?_sortBy=${by}&_sortType=${type}`);
    setSortBy(sort);
  };

  return (
    <Layout>
      <div className={styles.event}>
        <h1>Courses</h1>
        <div className={styles.sortbox}>
          <h5>Sort By: </h5>
          <UncontrolledDropdown>
            <DropdownToggle
              caret
              color="secondary"
              id="dropdownMenuButton"
              type="button"
            >
              {sortBy}
            </DropdownToggle>

            <DropdownMenu aria-labelledby="dropdownMenuButton">
              <DropdownItem onClick={(e) => handleSort(e, 'Popularity', 'Popularity', 'desc')}>
                Popularity
              </DropdownItem>

              <DropdownItem onClick={(e) => handleSort(e, 'Lowest to Highest Price', 'Price', 'asc')}>
                Lowest Price
              </DropdownItem>

              <DropdownItem onClick={(e) => handleSort(e, 'Highest to Lower Price', 'Price', 'desc')}>
                Highest Price
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
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

export async function getServerSideProps({ query: { page = 1, _sortBy = 'Popularity', _sortType = 'desc' } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
  const total = 1;

  // Fetch courses
  const courseRes = await fetch(
    `${API_URL}api/v1/courses?_sortBy=${_sortBy.toLowerCase()}&_sortType=${_sortType.toLowerCase()}&_limit=${PER_PAGE}&_start=${start}`
  );
  const res = await courseRes.json();
  const courses = res.data || [];

  return {
    props: { courses, page: +page, total, _sortBy, _sortType },
  };
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};