// Adds a stable, unique `id` to every h2/h3 heading at build time.
//
// The ids power deep links, the table of contents and the scroll-spy on the
// article page. They are also exposed to GraphQL through the `headings` field
// of gatsby-transformer-remark (it reads `data.id`), so the table of contents
// can be rendered on the server without any client-side DOM scanning.
module.exports = ({ markdownAST }) => {
  const extractText = node => {
    if (typeof node.value === 'string') return node.value;
    if (Array.isArray(node.children)) return node.children.map(extractText).join('');
    return '';
  };

  const slugify = text =>
    text
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/['’`]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const used = new Map();
  let fallbackCount = 0;

  const uniqueId = base => {
    const root = base || `bagian-${++fallbackCount}`;
    const count = used.get(root) || 0;
    used.set(root, count + 1);
    return count === 0 ? root : `${root}-${count}`;
  };

  const walk = node => {
    if (node.type === 'heading' && (node.depth === 2 || node.depth === 3)) {
      const id = uniqueId(slugify(extractText(node)));
      node.data = node.data || {};
      node.data.id = id;
      node.data.hProperties = Object.assign({}, node.data.hProperties, { id });
      return;
    }
    if (Array.isArray(node.children)) node.children.forEach(walk);
  };

  walk(markdownAST);
  return markdownAST;
};
