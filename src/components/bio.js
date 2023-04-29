/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { StaticImage } from "gatsby-plugin-image"

import { rhythm } from '../utils/typography';

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            facebook
            website
          }
        }
      }
    }
  `);

  const { author, social } = data.site.siteMetadata;
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="/profile.jpeg"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
      <p>
        <strong>{author.name}</strong>
        <br />
        <a target="_blank" rel="noopener noreferrer" href={`https://twitter.com/${social.twitter}`}>
          Twitter
        </a>
        {` • `}
        <a target="_blank" rel="noopener noreferrer" href={`https://facebook.com/${social.facebook}`}>
          Facebook
        </a>
      </p>
    </div>
  );
};

export default Bio;
