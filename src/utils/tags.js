export const formatTag = tag =>
  tag.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

export const tagPath = tag => `/tag/${encodeURIComponent(tag)}/`;
