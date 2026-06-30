import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';
import MetaHead from '../components/MetaHead';
import AbstractPattern from '../components/AbstractPattern';

const SearchIcon = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

function searchPosts(posts, rawQuery) {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return posts.filter(post => {
    const haystack = [
      post.frontmatter.title,
      post.frontmatter.description,
      post.excerpt,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return terms.every(term => haystack.includes(term));
  });
}

const SearchPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query SearchQuery {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        nodes {
          excerpt(pruneLength: 160)
          fields {
            slug
          }
          frontmatter {
            title
            description
            date(formatString: "DD MMM YYYY")
            dateISO: date(formatString: "YYYY-MM-DD")
          }
        }
      }
    }
  `);

  const siteTitle = data.site.siteMetadata.title;
  const allPosts = data.allMarkdownRemark.nodes;

  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(location.search);
      setQuery(params.get('q') || '');
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [location.search]);

  const handleChange = e => {
    const val = e.target.value;
    setQuery(val);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (val) {
        url.searchParams.set('q', val);
      } else {
        url.searchParams.delete('q');
      }
      window.history.replaceState({}, '', url.toString());
    }
  };

  const results = useMemo(() => searchPosts(allPosts, query), [allPosts, query]);

  const hasQuery = query.trim().length > 0;

  return (
    <Layout location={location} title={siteTitle}>
      <MetaHead title="Cari Artikel" />

      <div className="site-main__inner">
        <div className="search-header">
          <h1 className="search-title">Cari Artikel</h1>
          <p className="search-subtitle">
            Temukan artikel dari {allPosts.length} tulisan yang tersedia
          </p>
        </div>

        <div className="search-form" role="search">
          <label htmlFor="search-input" className="sr-only">
            Cari artikel
          </label>
          <div className="search-input-wrapper">
            <SearchIcon />
            <input
              ref={inputRef}
              id="search-input"
              type="search"
              className="search-input"
              placeholder="Ketik kata kunci..."
              value={query}
              onChange={handleChange}
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </div>

        {hasQuery && (
          <div className="section-header">
            <h2 className="section-title">
              {results.length > 0
                ? `Hasil untuk "${query}"`
                : `Tidak ada hasil untuk "${query}"`}
            </h2>
            <span className="section-count" aria-live="polite">
              {results.length} artikel
            </span>
          </div>
        )}

        {results.length > 0 && (
          <div className="post-grid" role="list" aria-label="Hasil pencarian">
            {results.map(node => {
              const title = node.frontmatter.title || node.fields.slug;
              return (
                <article
                  key={node.fields.slug}
                  className="post-card"
                  role="listitem"
                >
                  <div className="post-card__pattern" aria-hidden="true">
                    <AbstractPattern slug={node.fields.slug} />
                  </div>
                  <div className="post-card__body">
                    <div className="post-card__meta">
                      <time
                        className="post-card__date"
                        dateTime={node.frontmatter.dateISO}
                      >
                        {node.frontmatter.date}
                      </time>
                    </div>
                    <h3 className="post-card__title">
                      <Link to={node.fields.slug}>{title}</Link>
                    </h3>
                    <p
                      className="post-card__excerpt"
                      dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.excerpt,
                      }}
                    />
                    <Link
                      to={node.fields.slug}
                      className="post-card__cta"
                      aria-label={`Baca artikel: ${title}`}
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      Baca artikel
                      <ArrowRightIcon />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {hasQuery && results.length === 0 && (
          <div className="search-empty">
            <p>
              Tidak ada artikel yang cocok dengan{' '}
              <strong>&ldquo;{query}&rdquo;</strong>.
            </p>
            <p>
              Coba kata kunci lain atau{' '}
              <Link to="/">lihat semua artikel</Link>.
            </p>
          </div>
        )}

        {!hasQuery && (
          <div className="search-empty">
            <SearchIcon size={40} />
            <p>Ketik kata kunci untuk mulai mencari artikel.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
