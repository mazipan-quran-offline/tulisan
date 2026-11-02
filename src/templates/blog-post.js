import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import MetaHead from '../components/MetaHead';
import AbstractPattern from '../components/AbstractPattern';
import ReadingProgress from '../components/ReadingProgress';
import TableOfContents from '../components/TableOfContents';
import LazyDisqus from '../components/LazyDisqus';
import {
  CalendarIcon,
  ClockIcon,
  FacebookIcon,
  XIcon,
  WhatsAppIcon,
  GitHubIcon,
  LinkIcon,
  SparklesIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BookOpenIcon,
} from '../components/icons';
import { formatTag, tagPath } from '../utils/tags';

const MAIN_SITE = 'https://www.baca-quran.id';
const ARTICLE_ID = 'article';
const MIN_TOC_HEADINGS = 3;

const copyText = async text => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    try {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(area);
      return ok;
    } catch (err) {
      return false;
    }
  }
};

const CopyButton = ({ getText, label, doneLabel, ariaLabel, icon }) => {
  const [status, setStatus] = useState('idle');

  const handleClick = async () => {
    const ok = await copyText(getText());
    setStatus(ok ? 'done' : 'error');
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="post-actions__btn post-actions__btn--copy"
      aria-label={ariaLabel}
    >
      {icon}
      <span aria-live="polite">
        {status === 'done' ? doneLabel : status === 'error' ? 'Gagal menyalin' : label}
      </span>
    </button>
  );
};

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next, relatedPosts, tags, slug } = pageContext;
  const disqusConfig = {
    url: `${data.site.siteMetadata.siteUrl}/tulisan${location.pathname}`,
    identifier: post.id,
    title: post.frontmatter.title,
  };

  const pageUrl = `https://www.baca-quran.id${location.pathname}`;
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(post.frontmatter.title);
  const encodedDesc = encodeURIComponent(post.frontmatter.description || '');
  const aiText = `# ${post.frontmatter.title}\n\nSumber: ${pageUrl}\n\n${post.rawMarkdownBody}`;
  const editPath = location.pathname.replace(rootPath, '');

  const tocHeadings = (post.headings || []).filter(
    h => h.id && (h.depth === 2 || h.depth === 3),
  );
  const hasToc = tocHeadings.length >= MIN_TOC_HEADINGS;

  return (
    <Layout location={location} title={siteTitle}>
      <MetaHead
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <ReadingProgress targetId={ARTICLE_ID} />

      <div className="post-shell">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link to="/">Beranda</Link>
            </li>
            {tags && tags.length > 0 && (
              <li>
                <Link to={tagPath(tags[0])}>{formatTag(tags[0])}</Link>
              </li>
            )}
          </ol>
        </nav>

        <article className={`blog-post${hasToc ? '' : ' blog-post--no-toc'}`} id={ARTICLE_ID}>
          <header className="blog-post__header">
            <div className="blog-post__meta">
              <time className="blog-post__meta-item" dateTime={post.frontmatter.dateISO}>
                <CalendarIcon />
                {post.frontmatter.date}
              </time>
              {post.timeToRead > 0 && (
                <span className="blog-post__meta-item">
                  <ClockIcon />
                  {post.timeToRead} menit baca
                </span>
              )}
              {tags && tags.length > 0 ? (
                <ul className="post-tags" aria-label="Tag artikel" role="list">
                  {tags.map(tag => (
                    <li key={tag}>
                      <Link to={tagPath(tag)} className="blog-post__tag">
                        {formatTag(tag)}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="blog-post__tag">Artikel</span>
              )}
            </div>
            <h1 className="blog-post__title">{post.frontmatter.title}</h1>
          </header>

          <div className={`post-layout${hasToc ? '' : ' post-layout--no-toc'}`}>
            {hasToc && <TableOfContents headings={tocHeadings} />}

            <div className="blog-post__body">
              <div className="post-cover" aria-hidden="true">
                <AbstractPattern slug={slug} />
              </div>

              <section
                className="blog-post__content"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />

              <div className="post-actions">
                <span className="post-actions__label" id="share-label">
                  Bagikan artikel ini
                </span>
                <div className="post-actions__share" role="group" aria-labelledby="share-label">
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
                    <XIcon />X
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
                  <CopyButton
                    getText={() => pageUrl}
                    label="Salin Tautan"
                    doneLabel="Tautan disalin"
                    ariaLabel="Salin tautan artikel"
                    icon={<LinkIcon />}
                  />
                  <CopyButton
                    getText={() => aiText}
                    label="Salin untuk AI"
                    doneLabel="Teks disalin"
                    ariaLabel="Salin seluruh isi artikel dalam format teks untuk AI"
                    icon={<SparklesIcon />}
                  />
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

              <aside className="cta-card" aria-labelledby="cta-title">
                <h2 className="cta-card__title" id="cta-title">
                  Lanjutkan membaca di Baca-Quran.id
                </h2>
                <p className="cta-card__text">
                  Baca Al-Qur&apos;an per ayat, buka Juz Amma, atau berdzikir dengan tasbih digital
                  langsung di aplikasi Baca-Quran.id.
                </p>
                <div className="cta-card__links">
                  <a className="btn btn--primary" href={`${MAIN_SITE}/`}>
                    Buka Baca-Quran.id
                    <ArrowRightIcon size={14} />
                  </a>
                  <a className="btn btn--ghost" href={`${MAIN_SITE}/juz-amma/`}>
                    Juz Amma
                  </a>
                  <a className="btn btn--ghost" href={`${MAIN_SITE}/tasbih/`}>
                    Tasbih Digital
                  </a>
                </div>
              </aside>

              <section className="comments-section" aria-labelledby="comments-title">
                <h2 className="comments-section__title" id="comments-title">
                  Diskusi
                </h2>
                <div
                  data-disqus-identifier={disqusConfig.identifier}
                  data-disqus-title={disqusConfig.title}
                  data-disqus-url={disqusConfig.url}
                >
                  <LazyDisqus config={disqusConfig} />
                </div>
              </section>
            </div>
          </div>
        </article>

        {relatedPosts && relatedPosts.length > 0 && (
          <section className="related-posts" aria-labelledby="related-title">
            <h2 className="related-posts__title" id="related-title">
              <BookOpenIcon />
              Baca Juga
            </h2>
            <ul className="related-posts__grid" role="list">
              {relatedPosts.map(rp => (
                <li key={rp.slug} className="related-posts__item reveal">
                  <Link to={rp.slug} className="related-posts__link">
                    <span className="related-posts__date">{rp.date}</span>
                    <span className="related-posts__name">{rp.title}</span>
                    {rp.tags && rp.tags.length > 0 && (
                      <span className="related-posts__tags">
                        {rp.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="related-posts__tag">
                            {formatTag(tag)}
                          </span>
                        ))}
                      </span>
                    )}
                    {rp.description && <span className="related-posts__desc">{rp.description}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {(previous || next) && (
          <nav className="post-nav" aria-label="Navigasi antar artikel">
            <ul className="post-nav__grid" role="list">
              {previous ? (
                <li className="post-nav__item--prev">
                  <Link to={previous.fields.slug} rel="prev" className="post-nav__link">
                    <span className="post-nav__direction">
                      <ArrowLeftIcon size={12} />
                      Sebelumnya
                    </span>
                    <span className="post-nav__title">{previous.frontmatter.title}</span>
                  </Link>
                </li>
              ) : (
                <li aria-hidden="true" />
              )}

              {next ? (
                <li className="post-nav__item--next">
                  <Link to={next.fields.slug} rel="next" className="post-nav__link">
                    <span className="post-nav__direction">
                      Selanjutnya
                      <ArrowRightIcon size={12} />
                    </span>
                    <span className="post-nav__title">{next.frontmatter.title}</span>
                  </Link>
                </li>
              ) : (
                <li aria-hidden="true" />
              )}
            </ul>
          </nav>
        )}
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
      rawMarkdownBody
      timeToRead
      headings {
        id
        value
        depth
      }
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
        dateISO: date(formatString: "YYYY-MM-DD")
        description
      }
    }
  }
`;
