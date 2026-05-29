// Detects paragraph nodes containing Arabic characters and wraps them in a
// div with class="font-arabic" dir="rtl" so they render with the correct
// font, size, and right-to-left alignment without requiring manual markup
// in every content file.
module.exports = ({ markdownAST }) => {
  // Covers Arabic (U+0600–U+06FF), Arabic Supplement, Arabic Extended-A,
  // Arabic Presentation Forms-A and -B — enough to catch Quranic text.
  const ARABIC_RE = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;

  const extractText = (node) => {
    if (node.type === 'text') return node.value;
    if (Array.isArray(node.children)) return node.children.map(extractText).join('');
    return '';
  };

  const walk = (node) => {
    if (!Array.isArray(node.children)) return;

    // Walk in reverse so splicing doesn't shift unvisited indices
    for (let i = node.children.length - 1; i >= 0; i--) {
      const child = node.children[i];
      if (child.type === 'paragraph' && ARABIC_RE.test(extractText(child))) {
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
    }
  };

  walk(markdownAST);
  return markdownAST;
};
