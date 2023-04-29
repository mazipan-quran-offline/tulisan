// Gatsby supports TypeScript natively!
import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import MetaHead from '../components/MetaHead';
import Pagination from '../components/pagination';
import { rhythm } from '../utils/typography';

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  const { currentPage, numPages, isDev } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();

  return (
    <Layout location={location} title={siteTitle}>
      <MetaHead title="Semua artikel terkait Baca-Quran.id" />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        console.debug({ pageContext, node });
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        );
      })}

      <Pagination
        numPages={numPages}
        currentPage={currentPage}
        prevPage={prevPage}
        nextPage={nextPage}
        isFirst={isFirst}
        isLast={isLast}
      />
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: {frontmatter: {date: DESC}}, skip: $skip, limit: $limit) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
