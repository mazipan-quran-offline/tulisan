/**
 * Meta component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const meta = ({ description, lang, meta, title }) => {
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

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        { name: 'robots', content: 'follow,index' },
        {
          name: 'theme-color',
          content: '#071e3d',
        },
        {
          name: `description`,
          content: metaDescription,
        },
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
          content: `website`,
        },
        { property: 'og:image', content: '/tulisan/meta-image.png' },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.social.twitter,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        { name: 'twitter:image:src', content: '/tulisan/meta-image.png' },
        {
          content: '25fxaXcctkaxC3eyPtDYikfEMRCaJE_kQI8d43rvgbA',
          name: 'google-site-verification',
        },
      ].concat(meta)}
    />
  );
};

meta.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

export default meta;
