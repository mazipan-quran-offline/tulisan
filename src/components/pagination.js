import React from 'react';
import { Link } from 'gatsby';

const ChevronLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const Pagination = ({ numPages, currentPage, prevPage, nextPage, isFirst, isLast }) => {
  if (numPages <= 1) return null;

  // Build the visible page list with a wing of ±2 around the current page.
  // e.g. current=6 of 15 → 1, …, 4, 5, 6, 7, 8, …, 15
  // A single hidden page is shown directly instead of as an ellipsis.
  const getVisiblePages = () => {
    const WING = 2;
    const shown = new Set([1, numPages]);
    for (let p = Math.max(2, currentPage - WING); p <= Math.min(numPages - 1, currentPage + WING); p++) {
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

  const visiblePages = getVisiblePages();

  return (
    <nav className="pagination" aria-label="Navigasi halaman">
      {isFirst ? (
        <span
          className="pagination__btn pagination__btn--nav"
          aria-disabled="true"
          style={{ opacity: 0.35, cursor: 'default', pointerEvents: 'none' }}
        >
          <ChevronLeft />
        </span>
      ) : (
        <Link
          to={prevPage}
          rel="prev"
          className="pagination__btn pagination__btn--nav"
          aria-label="Halaman sebelumnya"
        >
          <ChevronLeft />
        </Link>
      )}

      {visiblePages.map((item) => {
        if (item.type === 'ellipsis') {
          return (
            <span key={item.key} className="pagination__ellipsis" aria-hidden="true">
              &hellip;
            </span>
          );
        }

        const pageNum = item.num;
        const isActive = pageNum === currentPage;
        const to = pageNum === 1 ? '/' : `/${pageNum}`;

        if (isActive) {
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
            to={to}
            className="pagination__btn"
            aria-label={`Halaman ${pageNum}`}
          >
            {pageNum}
          </Link>
        );
      })}

      {isLast ? (
        <span
          className="pagination__btn pagination__btn--nav"
          aria-disabled="true"
          style={{ opacity: 0.35, cursor: 'default', pointerEvents: 'none' }}
        >
          <ChevronRight />
        </span>
      ) : (
        <Link
          to={nextPage}
          rel="next"
          className="pagination__btn pagination__btn--nav"
          aria-label="Halaman selanjutnya"
        >
          <ChevronRight />
        </Link>
      )}
    </nav>
  );
};

export default Pagination;
