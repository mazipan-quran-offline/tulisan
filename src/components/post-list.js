import React from 'react';

import PostCard from './post-card';
import AdSlot from './AdSlot';
import { AD_SLOTS, IN_FEED_AFTER } from '../config/ads';

// Article grid for list pages. When an in-feed ad is configured, one ad card
// is placed after the IN_FEED_AFTER-th article (only if the page has more).
const PostList = ({ nodes, label, featuredFirst = false }) => (
  <ul className="post-grid" role="list" aria-label={label}>
    {nodes.map((node, i) => (
      <React.Fragment key={node.fields.slug}>
        <PostCard node={node} featured={featuredFirst && i === 0} />
        {AD_SLOTS.inFeed && i === IN_FEED_AFTER - 1 && nodes.length > IN_FEED_AFTER && (
          <li className="post-grid__item post-grid__item--ad">
            <AdSlot slot={AD_SLOTS.inFeed} variant="in-feed" />
          </li>
        )}
      </React.Fragment>
    ))}
  </ul>
);

export default PostList;
