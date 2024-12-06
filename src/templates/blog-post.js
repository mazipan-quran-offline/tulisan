import React from 'react';
import { Link, graphql } from 'gatsby';
import { Disqus } from 'gatsby-plugin-disqus';

import Layout from '../components/layout';
import MetaHead from '../components/MetaHead';
import { rhythm, scale } from '../utils/typography';

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const rootPath = `${__PATH_PREFIX__}/`;

  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  let disqusConfig = {
    url: `${data.site.siteMetadata.siteUrl + '/tulisan' + location.pathname}`,
    identifier: post.id,
    title: post.title,
  };

  return (
    <Layout location={location} title={siteTitle}>
      <MetaHead title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          Bagikan artikel ke {` `}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              'https://www.baca-quran.id' + location.pathname,
            )}&title=${encodeURIComponent(post.frontmatter.title)}&description=${encodeURIComponent(
              post.frontmatter.description,
            )}`}
          >
            Facebook
          </a>
          {` • `}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              post.frontmatter.title,
            )}&url=${encodeURIComponent('https://www.baca-quran.id' + location.pathname)}&via=maz_ipan`}
          >
            Twitter
          </a>
          <br />
          Perbaiki artikel di {` `}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://github.com/mazipan-quran-offline/tulisan/blob/master/content/blog/${location.pathname.replace(
              rootPath,
              '',
            )}index.md`}
          >
            Github
          </a>
        </footer>
        <hr
          style={{
            marginTop: rhythm(1),
            marginBottom: rhythm(1),
          }}
        />
      </article>

      <div
        data-disquss-identifier={disqusConfig.identifier}
        data-disquss-title={disqusConfig.title}
        data-disquss-url={disqusConfig.url}
      >
        <Disqus config={disqusConfig} />
      </div>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
