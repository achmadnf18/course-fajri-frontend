import Link from 'next/link';
import PropTypes from 'prop-types';
import { PER_PAGE } from '../config/index';

export default function Pagination({ page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE);
  return (
    <>
      {page > 1 && (
        <Link href={`/courses?page=${page - 1}`}>
          <button type="button" className="btn-secondary">Prev</button>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/courses?page=${page + 1}`}>
          <button type="button" className="btn-secondary">Next</button>
        </Link>
      )}
    </>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};
