import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import MetaHead from '../components/MetaHead';
import Pagination from '../components/pagination';
import PostCard from '../components/post-card';

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={11}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;
  const totalCount = data.allMarkdownRemark.totalCount;

  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? '/' : `/${currentPage - 1}`;
  const nextPage = `/${currentPage + 1}`;

  return (
    <Layout location={location} title={siteTitle}>
      <MetaHead title="Semua artikel terkait Baca-Quran.id" />

      {/* Hero is a direct child of <main> so its background spans the full screen */}
      {isFirst && (
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero__inner">
            <div className="hero__badge">
              <StarIcon />
              Artikel Terbaru
            </div>
            <h1 className="hero__title" id="hero-heading">
              Tulisan &amp; Panduan
              <span>Baca-Qur&apos;an.id</span>
            </h1>
            <p className="hero__description">
              Kumpulan artikel, panduan, dan tips seputar penggunaan aplikasi
              Baca-Qur'an.id. Temukan konten berkualitas untuk membantu
              perjalanan membaca Al-Qur'an Anda.
            </p>
            <div className="hero__stats" aria-label="Statistik blog">
              <div>
                <span className="hero__stat-number">{totalCount}</span>
                <span className="hero__stat-label">Artikel</span>
              </div>
              <div>
                <span className="hero__stat-number">{numPages}</span>
                <span className="hero__stat-label">Halaman</span>
              </div>
              <div>
                <span className="hero__stat-number">2018</span>
                <span className="hero__stat-label">Sejak</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Constrained content area */}
      <div className="site-main__inner">
        <div className="section-header">
          <h2 className="section-title">
            {isFirst ? 'Semua Artikel' : `Halaman ${currentPage}`}
          </h2>
          <span className="section-count" aria-live="polite">
            {totalCount} artikel
          </span>
        </div>

        <div className="post-grid" role="list" aria-label="Daftar artikel">
          {posts.map(({ node }) => (
            <PostCard key={node.fields.slug} node={node} />
          ))}
        </div>

        <Pagination
          numPages={numPages}
          currentPage={currentPage}
          prevPage={prevPage}
          nextPage={nextPage}
          isFirst={isFirst}
          isLast={isLast}
        />
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
