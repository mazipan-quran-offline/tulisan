import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import MetaHead from '../components/MetaHead';
import PostCard from '../components/post-card';
import Sidebar from '../components/Sidebar';
import { formatTag } from '../utils/tags';

const TagTemplate = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title;
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const label = formatTag(tag);

  return (
    <Layout location={location} title={siteTitle}>
      <MetaHead
        title={`Artikel ${label}`}
        description={`Kumpulan ${totalCount} artikel dengan kategori ${label} di Baca-Quran.id.`}
        pathname={location.pathname}
      />

      <div className="site-main__inner">
        <div className="with-sidebar">
        <div className="with-sidebar__main">
        <div className="section-header">
          <h1 className="section-title">Kategori {label}</h1>
          <span className="section-count" aria-live="polite">
            {totalCount} artikel
          </span>
        </div>

        <p className="tag-page__back">
          <Link to="/tags/">&larr; Semua kategori</Link>
        </p>

        <ul className="post-grid" role="list" aria-label={`Artikel ${label}`}>
          {edges.map(({ node }) => (
            <PostCard key={node.fields.slug} node={node} />
          ))}
        </ul>
        </div>
        <Sidebar tags={data.tags.group} activeTag={tag} />
        </div>
      </div>
    </Layout>
  );
};

export default TagTemplate;

export const pageQuery = graphql`
  query ($tag: String!) {
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
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
