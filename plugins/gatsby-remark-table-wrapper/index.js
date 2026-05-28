// Wrap every <table> in the markdown AST with a scroll-container div.
// This runs at build time — no client-side JS or external dependencies needed.
module.exports = ({ markdownAST }) => {
  const walk = (node) => {
    if (!Array.isArray(node.children)) return;

    // Walk in reverse so splice offsets stay valid after insertion
    for (let i = node.children.length - 1; i >= 0; i--) {
      const child = node.children[i];
      if (child.type === 'table') {
        node.children.splice(
          i,
          1,
          {
            type: 'html',
            value:
              '<div class="table-scroll-wrapper" role="region" aria-label="Scrollable table" tabindex="0">',
          },
          child,
          { type: 'html', value: '</div>' }
        );
      } else {
        walk(child);
      }
    }
  };

  walk(markdownAST);
  return markdownAST;
};
