import React from 'react';
import { Link } from 'gatsby';

import { ChevronLeftIcon, ChevronRightIcon } from './icons';

const Pagination = ({ numPages, currentPage, prevPage, nextPage, isFirst, isLast }) => {
  if (numPages <= 1) return null;

  // Visible pages: first, last and a ±2 wing around the current page.
  // e.g. current=6 of 15 → 1 … 4 5 6 7 8 … 15
  // A single hidden page is shown directly instead of as an ellipsis.
  const getVisiblePages = () => {
    const WING = 2;
    const shown = new Set([1, numPages]);
    for (
      let p = Math.max(2, currentPage - WING);
      p <= Math.min(numPages - 1, currentPage + WING);
      p++
    ) {
      shown.add(p);
    }

    const sorted = [...shown].sort((a, b) => a - b);
    const result = [];

    for (let i = 0; i < sorted.length; i++) {
      if (i > 0) {
        const gap = sorted[i] - sorted[i - 1];
        if (gap === 2) {
          result.push({ type: 'page', num: sorted[i - 1] + 1 });
        } else if (gap > 2) {
          result.push({ type: 'ellipsis', key: `e-${sorted[i - 1]}` });
        }
      }
      result.push({ type: 'page', num: sorted[i] });
    }

    return result;
  };

  return (
    <nav className="pagination" aria-label="Navigasi halaman">
      {isFirst ? (
        <span className="pagination__btn pagination__btn--disabled" aria-hidden="true">
          <ChevronLeftIcon />
        </span>
      ) : (
        <Link to={prevPage} rel="prev" className="pagination__btn" aria-label="Halaman sebelumnya">
          <ChevronLeftIcon />
        </Link>
      )}

      {getVisiblePages().map(item => {
        if (item.type === 'ellipsis') {
          return (
            <span key={item.key} className="pagination__ellipsis" aria-hidden="true">
              &hellip;
            </span>
          );
        }

        const pageNum = item.num;
        if (pageNum === currentPage) {
          return (
            <span
              key={pageNum}
              className="pagination__btn pagination__btn--active"
              aria-current="page"
              aria-label={`Halaman ${pageNum}, halaman aktif`}
            >
              {pageNum}
            </span>
          );
        }

        return (
          <Link
            key={pageNum}
            to={pageNum === 1 ? '/' : `/${pageNum}`}
            className="pagination__btn"
            aria-label={`Halaman ${pageNum}`}
          >
            {pageNum}
          </Link>
        );
      })}

      {isLast ? (
        <span className="pagination__btn pagination__btn--disabled" aria-hidden="true">
          <ChevronRightIcon />
        </span>
      ) : (
        <Link to={nextPage} rel="next" className="pagination__btn" aria-label="Halaman selanjutnya">
          <ChevronRightIcon />
        </Link>
      )}
    </nav>
  );
};

export default Pagination;
