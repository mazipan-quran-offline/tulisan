import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';
import MetaHead from '../components/MetaHead';
import PostCard from '../components/post-card';
import { SearchIcon } from '../components/icons';
import { formatTag, tagPath } from '../utils/tags';

function searchPosts(posts, rawQuery) {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return posts.filter(post => {
    const haystack = [
      post.frontmatter.title,
      post.frontmatter.description,
      post.excerpt,
      ...(post.frontmatter.tags || []).map(formatTag),
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
      tags: allMarkdownRemark {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
          totalCount
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
            tags
            date(formatString: "DD MMM YYYY")
            dateISO: date(formatString: "YYYY-MM-DD")
          }
        }
      }
    }
  `);

  const siteTitle = data.site.siteMetadata.title;
  const allPosts = data.allMarkdownRemark.nodes;
  const suggestedTags = [...data.tags.group]
    .sort((a, b) => b.totalCount - a.totalCount || a.fieldValue.localeCompare(b.fieldValue))
    .slice(0, 8);

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
      <MetaHead title="Cari Artikel" pathname={location.pathname} noindex />

      <div className="site-main__inner">
        <div className="page-intro">
          <h1 className="page-intro__title">Cari Artikel</h1>
          <p className="page-intro__text">
            Temukan artikel dari {allPosts.length} tulisan yang tersedia
          </p>
        </div>

        <div className="search-form" role="search">
          <label htmlFor="search-input" className="sr-only">
            Cari artikel
          </label>
          <div className="search-input-wrapper">
            <SearchIcon size={20} />
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
          <ul className="post-grid" role="list" aria-label="Hasil pencarian">
            {results.map(node => (
              <PostCard key={node.fields.slug} node={node} />
            ))}
          </ul>
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
            <p>Ketik kata kunci untuk mulai mencari artikel, atau pilih topik berikut.</p>
          </div>
        )}

        {!hasQuery && suggestedTags.length > 0 && (
          <nav className="search-suggest" aria-label="Topik populer">
            <ul className="topics__list">
              {suggestedTags.map(({ fieldValue, totalCount }) => (
                <li key={fieldValue}>
                  <Link to={tagPath(fieldValue)} className="chip">
                    {formatTag(fieldValue)}
                    <span className="chip__count">{totalCount}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
