import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import MetaHead from '../components/MetaHead';
import { formatTag, tagPath } from '../utils/tags';

const TagsPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const tags = [...data.allMarkdownRemark.group].sort(
    (a, b) => b.totalCount - a.totalCount || a.fieldValue.localeCompare(b.fieldValue),
  );

  return (
    <Layout location={location} title={siteTitle}>
      <MetaHead title="Semua Kategori Artikel" />

      <div className="site-main__inner">
        <div className="section-header">
          <h1 className="section-title">Semua Kategori</h1>
          <span className="section-count">{tags.length} kategori</span>
        </div>

        <ul className="tag-list" aria-label="Daftar kategori">
          {tags.map(({ fieldValue, totalCount }) => (
            <li key={fieldValue}>
              <Link to={tagPath(fieldValue)} className="tag-list__item">
                {formatTag(fieldValue)}
                <span className="tag-list__count">{totalCount}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default TagsPage;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;
