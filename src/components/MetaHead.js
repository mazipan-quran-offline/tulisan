/**
 * Page-level <head> management.
 *
 * Handles title, description, canonical URL, robots, Open Graph / Twitter
 * tags and optional JSON-LD structured data. Pass `pathname` (from the page's
 * `location`) so canonical and og:url are absolute.
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const SITE_URL = 'https://www.baca-quran.id';
const DEFAULT_IMAGE = {
  url: `${SITE_URL}/tulisan/meta-image.png`,
  width: 2400,
  height: 1034,
};

// Keep one trailing slash so every page has a single canonical form.
const withTrailingSlash = path => (path.endsWith('/') ? path : `${path}/`);

// `<` is escaped so content can never close the script tag.
const serializeJsonLd = data => JSON.stringify(data).replace(/</g, '\\u003c');

const MetaHead = ({
  description,
  lang,
  meta,
  title,
  pathname,
  type,
  noindex,
  publishedTime,
  tags,
  jsonLd,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `,
  );

  const metaDescription = description || site.siteMetadata.description;
  const canonical = pathname ? `${SITE_URL}${withTrailingSlash(pathname)}` : null;
  const fullTitle = `${title} | ${site.siteMetadata.title}`;

  const articleMeta =
    type === 'article'
      ? [
          publishedTime && { property: 'article:published_time', content: publishedTime },
          ...(tags || []).map(tag => ({ property: 'article:tag', content: tag })),
        ].filter(Boolean)
      : [];

  const schemas = (jsonLd || []).filter(Boolean);

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      link={canonical ? [{ rel: 'canonical', href: canonical }] : []}
      script={schemas.map(data => ({
        type: 'application/ld+json',
        innerHTML: serializeJsonLd(data),
      }))}
      meta={[
        { name: 'robots', content: noindex ? 'noindex,follow' : 'follow,index' },
        { name: 'theme-color', content: '#fbfaf6', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#0c1311', media: '(prefers-color-scheme: dark)' },
        {
          name: `description`,
          content: metaDescription,
        },
        { property: `og:site_name`, content: site.siteMetadata.title },
        { property: `og:locale`, content: `id_ID` },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: type,
        },
        canonical && { property: 'og:url', content: canonical },
        { property: 'og:image', content: DEFAULT_IMAGE.url },
        { property: 'og:image:width', content: String(DEFAULT_IMAGE.width) },
        { property: 'og:image:height', content: String(DEFAULT_IMAGE.height) },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: `@${site.siteMetadata.social.twitter}`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        { name: 'twitter:image', content: DEFAULT_IMAGE.url },
        {
          content: '25fxaXcctkaxC3eyPtDYikfEMRCaJE_kQI8d43rvgbA',
          name: 'google-site-verification',
        },
        ...articleMeta,
      ]
        .filter(Boolean)
        .concat(meta)}
    />
  );
};

MetaHead.defaultProps = {
  lang: `id`,
  meta: [],
  description: ``,
  type: `website`,
  noindex: false,
};

export default MetaHead;
