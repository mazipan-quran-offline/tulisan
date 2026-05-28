// Wrap every <table> in the markdown AST with a scroll-container div.
// This runs at build time — no client-side JS needed.
const visit = require('unist-util-visit');

module.exports = ({ markdownAST }) => {
  visit(markdownAST, 'table', (node, index, parent) => {
    parent.children.splice(
      index,
      1,
      {
        type: 'html',
        value:
          '<div class="table-scroll-wrapper" role="region" aria-label="Scrollable table" tabindex="0">',
      },
      node,
      { type: 'html', value: '</div>' }
    );

    // Skip past the three nodes we just inserted so we don't visit them again
    return [visit.SKIP, index + 2];
  });

  return markdownAST;
};
