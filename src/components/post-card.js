import React from 'react';
import { Link } from 'gatsby';

import AbstractPattern from './AbstractPattern';
import { formatTag, tagPath } from '../utils/tags';

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
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

const PostCard = ({ node }) => {
  const title = node.frontmatter.title || node.fields.slug;
  return (
    <article className="post-card" role="listitem">
      <div className="post-card__pattern" aria-hidden="true">
        <AbstractPattern slug={node.fields.slug} />
      </div>
      <div className="post-card__body">
        <div className="post-card__meta">
          <time className="post-card__date" dateTime={node.frontmatter.dateISO}>
            {node.frontmatter.date}
          </time>
          {node.frontmatter.tags && node.frontmatter.tags.length > 0 && (
            <div className="post-card__tags">
              {node.frontmatter.tags.slice(0, 2).map(tag => (
                <Link key={tag} to={tagPath(tag)} className="post-card__tag">
                  {formatTag(tag)}
                </Link>
              ))}
            </div>
          )}
        </div>
        <h3 className="post-card__title">
          <Link to={node.fields.slug}>{title}</Link>
        </h3>
        <p
          className="post-card__excerpt"
          dangerouslySetInnerHTML={{
            __html: node.frontmatter.description || node.excerpt,
          }}
        />
        <Link
          to={node.fields.slug}
          className="post-card__cta"
          aria-label={`Baca artikel: ${title}`}
          tabIndex={-1}
          aria-hidden="true"
        >
          Baca artikel
          <ArrowRightIcon />
        </Link>
      </div>
    </article>
  );
};

export default PostCard;
