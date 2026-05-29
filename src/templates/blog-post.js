import React from 'react';
import { Link, graphql } from 'gatsby';
import { Disqus } from 'gatsby-plugin-disqus';

import Layout from '../components/layout';
import MetaHead from '../components/MetaHead';
import AbstractPattern from '../components/AbstractPattern';

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
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

const BookOpenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next, relatedPosts } = pageContext;
  const disqusConfig = {
    url: `${data.site.siteMetadata.siteUrl}/tulisan${location.pathname}`,
    identifier: post.id,
    title: post.frontmatter.title,
  };

  const pageUrl = `https://www.baca-quran.id${location.pathname}`;
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(post.frontmatter.title);
  const encodedDesc = encodeURIComponent(post.frontmatter.description || '');
  const editPath = location.pathname.replace(rootPath, '');

  return (
    <Layout location={location} title={siteTitle}>
      <MetaHead
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />

      {/* Full-width decorative pattern banner for the post */}
      <div className="post-hero" aria-hidden="true">
        <AbstractPattern slug={location.pathname} />
      </div>

      <div className="site-main__inner">
      <article className="blog-post">
        <header className="blog-post__header">
          <div className="blog-post__meta">
            <time
              className="blog-post__date"
              dateTime={post.frontmatter.dateISO}
            >
              <CalendarIcon />
              {post.frontmatter.date}
            </time>
            <span className="blog-post__tag">Artikel</span>
          </div>
          <h1 className="blog-post__title">{post.frontmatter.title}</h1>
        </header>

        <section
          className="blog-post__content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <div className="post-actions">
          <div className="post-actions__share">
            <span className="post-actions__label">Bagikan:</span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&title=${encodedTitle}&description=${encodedDesc}`}
              target="_blank"
              rel="noopener noreferrer"
              className="post-actions__btn post-actions__btn--facebook"
              aria-label="Bagikan ke Facebook"
            >
              <FacebookIcon />
              Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=maz_ipan`}
              target="_blank"
              rel="noopener noreferrer"
              className="post-actions__btn post-actions__btn--twitter"
              aria-label="Bagikan ke Twitter/X"
            >
              <TwitterIcon />
              Twitter
            </a>
            <a
              href={`https://github.com/mazipan-quran-offline/tulisan/blob/master/content/blog/${editPath}index.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="post-actions__btn post-actions__btn--github"
              aria-label="Perbaiki artikel ini di GitHub"
            >
              <GitHubIcon />
              Perbaiki di GitHub
            </a>
          </div>
        </div>
      </article>

      <section
        className="comments-section"
        aria-label="Diskusi artikel"
      >
        <h2 className="comments-section__title">Diskusi</h2>
        <div
          data-disqus-identifier={disqusConfig.identifier}
          data-disqus-title={disqusConfig.title}
          data-disqus-url={disqusConfig.url}
        >
          <Disqus config={disqusConfig} />
        </div>
      </section>

      {relatedPosts && relatedPosts.length > 0 && (
        <section className="related-posts" aria-label="Artikel lainnya untuk dibaca">
          <h2 className="related-posts__title">
            <BookOpenIcon />
            Baca Juga
          </h2>
          <ul className="related-posts__grid">
            {relatedPosts.map(rp => (
              <li key={rp.slug} className="related-posts__item">
                <Link to={rp.slug} className="related-posts__link">
                  <span className="related-posts__date">{rp.date}</span>
                  <span className="related-posts__name">{rp.title}</span>
                  {rp.description && (
                    <span className="related-posts__desc">{rp.description}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav className="post-nav" aria-label="Navigasi antar artikel">
        <ul className="post-nav__grid">
          {previous ? (
            <li className="post-nav__item--prev">
              <Link
                to={previous.fields.slug}
                rel="prev"
                className="post-nav__link"
              >
                <span className="post-nav__direction">
                  <ArrowLeftIcon />
                  Sebelumnya
                </span>
                <span className="post-nav__title">
                  {previous.frontmatter.title}
                </span>
              </Link>
            </li>
          ) : (
            <li />
          )}

          {next ? (
            <li className="post-nav__item--next">
              <Link
                to={next.fields.slug}
                rel="next"
                className="post-nav__link"
              >
                <span className="post-nav__direction">
                  Selanjutnya
                  <ArrowRightIcon />
                </span>
                <span className="post-nav__title">{next.frontmatter.title}</span>
              </Link>
            </li>
          ) : (
            <li />
          )}
        </ul>
      </nav>
      </div>
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
        date(formatString: "DD MMMM YYYY")
        dateISO: date(formatString: "YYYY-MM-DD")
        description
      }
    }
  }
`;
