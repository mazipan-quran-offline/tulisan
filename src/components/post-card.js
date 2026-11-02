import React from 'react';
import { Link } from 'gatsby';

import AbstractPattern from './AbstractPattern';
import { ArrowRightIcon } from './icons';
import { formatTag, tagPath } from '../utils/tags';

const PostCard = ({ node, featured = false }) => {
  const title = node.frontmatter.title || node.fields.slug;
  const tags = node.frontmatter.tags || [];
  return (
    <li className={`post-grid__item reveal${featured ? ' post-grid__item--featured' : ''}`}>
      <article className={`post-card${featured ? ' post-card--featured' : ''}`}>
        <div className="post-card__pattern" aria-hidden="true">
          <AbstractPattern slug={node.fields.slug} />
        </div>
        <div className="post-card__body">
          <div className="post-card__meta">
            <time className="post-card__date" dateTime={node.frontmatter.dateISO}>
              {node.frontmatter.date}
            </time>
            {tags.length > 0 && (
              <div className="post-card__tags">
                {tags.slice(0, 2).map(tag => (
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
          <span className="post-card__cta" aria-hidden="true">
            Baca artikel
            <ArrowRightIcon size={13} />
          </span>
        </div>
      </article>
    </li>
  );
};

export default PostCard;
