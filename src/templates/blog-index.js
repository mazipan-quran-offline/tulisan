import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import MetaHead from '../components/MetaHead';
import Pagination from '../components/pagination';
import PostCard from '../components/post-card';
import Sidebar from '../components/Sidebar';
import { SearchIcon, ArrowRightIcon, StarMark } from '../components/icons';
import { formatTag, tagPath } from '../utils/tags';
import { websiteSchema } from '../utils/structured-data';

const MAIN_SITE = 'https://www.baca-quran.id/';
const TOP_TOPICS = 10;

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;
  const totalCount = data.allMarkdownRemark.totalCount;
  const tagGroups = data.tags.group;

  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? '/' : `/${currentPage - 1}`;
  const nextPage = `/${currentPage + 1}`;

  const topTopics = [...tagGroups]
    .sort((a, b) => b.totalCount - a.totalCount || a.fieldValue.localeCompare(b.fieldValue))
    .slice(0, TOP_TOPICS);

  return (
    <Layout location={location} title={siteTitle}>
      <MetaHead
        title="Semua artikel terkait Baca-Quran.id"
        description={data.site.siteMetadata.description}
        pathname={location.pathname}
        jsonLd={isFirst ? [websiteSchema(data.site.siteMetadata)] : []}
      />

      {/* Hero is a direct child of <main> so its background spans the full screen */}
      {isFirst && (
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero__ornament" aria-hidden="true">
            <svg viewBox="0 0 200 200" fill="none" stroke="currentColor">
              {[92, 72, 52, 32].map((r, i) => (
                <g key={r} className={`hero__ornament-ring hero__ornament-ring--${i}`}>
                  <rect x={100 - r / 1.2} y={100 - r / 1.2} width={(r / 1.2) * 2} height={(r / 1.2) * 2} rx="3" strokeWidth={i === 0 ? 1.2 : 1} />
                  <rect x={100 - r / 1.2} y={100 - r / 1.2} width={(r / 1.2) * 2} height={(r / 1.2) * 2} rx="3" strokeWidth={i === 0 ? 1.2 : 1} transform="rotate(45 100 100)" />
                </g>
              ))}
            </svg>
          </div>
          <div className="hero__inner">
            <div className="hero__badge">
              <StarMark size={14} />
              Blog Baca-Quran.id
            </div>
            <h1 className="hero__title" id="hero-heading">
              Tulisan &amp; Panduan
              <span>Baca-Qur&apos;an.id</span>
            </h1>
            <p className="hero__description">
              Kumpulan artikel, panduan, dan tips seputar penggunaan aplikasi Baca-Qur&apos;an.id.
              Temukan konten berkualitas untuk membantu perjalanan membaca Al-Qur&apos;an Anda.
            </p>
            <div className="hero__actions">
              <Link to="/search" className="btn btn--primary">
                <SearchIcon size={18} />
                Cari artikel
              </Link>
              <Link to="/tags/" className="btn btn--ghost">
                Jelajahi kategori
              </Link>
              <a href={MAIN_SITE} className="btn btn--ghost">
                Buka Baca-Quran.id
                <ArrowRightIcon size={14} />
              </a>
            </div>
            <dl className="hero__stats" aria-label="Statistik blog">
              <div>
                <dt className="hero__stat-label">Artikel</dt>
                <dd className="hero__stat-number">{totalCount}</dd>
              </div>
              <div>
                <dt className="hero__stat-label">Kategori</dt>
                <dd className="hero__stat-number">{tagGroups.length}</dd>
              </div>
              <div>
                <dt className="hero__stat-label">Sejak</dt>
                <dd className="hero__stat-number">2018</dd>
              </div>
            </dl>
          </div>
        </section>
      )}

      {/* Constrained content area */}
      <div className="site-main__inner">
        <div className="with-sidebar">
        <div className="with-sidebar__main">
        {isFirst && topTopics.length > 0 && (
          <nav className="topics topics--hide-wide" aria-labelledby="topics-label">
            <span className="topics__label" id="topics-label">
              Topik populer
            </span>
            <ul className="topics__list">
              {topTopics.map(({ fieldValue, totalCount: count }) => (
                <li key={fieldValue}>
                  <Link to={tagPath(fieldValue)} className="chip">
                    {formatTag(fieldValue)}
                    <span className="chip__count">{count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="section-header">
          <h2 className="section-title">{isFirst ? 'Semua Artikel' : `Halaman ${currentPage}`}</h2>
          <span className="section-count" aria-live="polite">
            {totalCount} artikel
          </span>
        </div>

        <ul className="post-grid" role="list" aria-label="Daftar artikel">
          {posts.map(({ node }, i) => (
            <PostCard key={node.fields.slug} node={node} featured={isFirst && i === 0} />
          ))}
        </ul>

        <Pagination
          numPages={numPages}
          currentPage={currentPage}
          prevPage={prevPage}
          nextPage={nextPage}
          isFirst={isFirst}
          isLast={isLast}
        />
        </div>
        <Sidebar tags={tagGroups} />
        </div>
      </div>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
        author {
          name
        }
        social {
          website
        }
      }
    }
    tags: allMarkdownRemark {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      skip: $skip
      limit: $limit
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMM YYYY")
            dateISO: date(formatString: "YYYY-MM-DD")
            title
            description
            tags
          }
        }
      }
    }
  }
`;
