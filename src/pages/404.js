import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import MetaHead from '../components/MetaHead';
import { SearchIcon } from '../components/icons';

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <MetaHead title="Halaman tidak ditemukan" noindex />
      <div className="site-main__inner">
        <div className="not-found">
          <span className="not-found__code" aria-hidden="true">
            404
          </span>
          <h1 className="not-found__title">Halaman tidak ditemukan</h1>
          <p className="not-found__text">
            Tautan yang Anda buka mungkin sudah berpindah atau salah ketik. Coba cari artikelnya,
            atau kembali ke beranda untuk melihat tulisan terbaru.
          </p>
          <div className="hero__actions" style={{ marginTop: '0.5rem' }}>
            <Link to="/search" className="btn btn--primary">
              <SearchIcon size={18} />
              Cari artikel
            </Link>
            <Link to="/" className="btn btn--ghost">
              Kembali ke beranda
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
