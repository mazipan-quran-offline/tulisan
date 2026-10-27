import React from 'react';
import { Link, graphql } from 'gatsby';
import { Disqus } from 'gatsby-plugin-disqus';

import Layout from '../components/layout';
import MetaHead from '../components/MetaHead';
import AbstractPattern from '../components/AbstractPattern';
import { formatTag, tagPath } from '../utils/tags';

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

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
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
  const { previous, next, relatedPosts, tags } = pageContext;
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
            {tags && tags.length > 0 ? (
              <div className="post-tags" role="list" aria-label="Tag artikel">
                {tags.map(tag => (
                  <Link key={tag} to={tagPath(tag)} className="blog-post__tag" role="listitem">{formatTag(tag)}</Link>
                ))}
              </div>
            ) : (
              <span className="blog-post__tag">Artikel</span>
            )}
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
              href={`https://x.com/intent/post?text=${encodedTitle}&url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="post-actions__btn post-actions__btn--x"
              aria-label="Bagikan ke X"
            >
              <XIcon />
              X
            </a>
            <a
              href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="post-actions__btn post-actions__btn--whatsapp"
              aria-label="Bagikan ke WhatsApp"
            >
              <WhatsAppIcon />
              WhatsApp
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
                  {rp.tags && rp.tags.length > 0 && (
                    <span className="related-posts__tags">
                      {rp.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="related-posts__tag">{formatTag(tag)}</span>
                      ))}
                    </span>
                  )}
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
