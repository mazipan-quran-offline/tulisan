// At build time, wraps paragraphs that are predominantly Arabic (≥40% of
// non-space characters are Arabic) in <div class="font-arabic" dir="rtl">
// so they render with the correct font, size, and right-to-left alignment.
//
// Mixed paragraphs (mostly Latin with an inline Arabic quote) are left
// untouched — the browser's Unicode bidirectional algorithm handles short
// inline Arabic runs correctly without extra markup.
module.exports = ({ markdownAST }) => {
  const ARABIC_RE =
    /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-ﻼ]/;

  const BLOCK_THRESHOLD = 0.4;

  const extractText = (node) => {
    if (node.type === 'text') return node.value;
    if (Array.isArray(node.children)) return node.children.map(extractText).join('');
    return '';
  };

  const arabicRatio = (text) => {
    const stripped = text.replace(/\s/g, '');
    if (!stripped.length) return 0;
    const count = (stripped.match(/[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-ﻼ]/g) || []).length;
    return count / stripped.length;
  };

  const walk = (node) => {
    if (!Array.isArray(node.children)) return;

    // Walk in reverse so splicing doesn't shift unvisited indices
    for (let i = node.children.length - 1; i >= 0; i--) {
      const child = node.children[i];
      if (child.type === 'paragraph') {
        const text = extractText(child);
        if (ARABIC_RE.test(text) && arabicRatio(text) >= BLOCK_THRESHOLD) {
          node.children.splice(
            i,
            1,
            { type: 'html', value: '<div class="font-arabic" dir="rtl">' },
            child,
            { type: 'html', value: '</div>' }
          );
        } else {
          walk(child);
        }
      } else {
        walk(child);
      }
    }
  };

  walk(markdownAST);
  return markdownAST;
};
