// At build time, finds Arabic text in markdown and applies proper styling:
//   - Paragraphs that are ≥40% Arabic chars → wrapped as a right-aligned Arabic block
//   - Paragraphs that contain some Arabic but are mostly Latin → inline Arabic
//     runs are wrapped with <bdi class="font-arabic-inline"> for bidirectional
//     isolation without reversing the whole paragraph direction
module.exports = ({ markdownAST }) => {
  // Basic Arabic block + Supplement + Extended-A + Presentation Forms A/B
  const ARABIC_RE =
    /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-ﻼ]/;
  // Also matches spaces *between* Arabic words so the whole phrase lands in
  // one <bdi> and maintains correct RTL word order as a single inline unit.
  const ARABIC_SPLIT_RE =
    /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-ﻼ]+(?:\s+[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-ﻼ]+)*/g;

  // Treat paragraph as an Arabic block only when ≥40% of non-space chars
  // are Arabic. Inline quoted Arabic phrases stay well below this.
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

  // Split one text string into an array of remark nodes, wrapping Arabic runs
  // in <bdi class="font-arabic-inline"> inline HTML nodes.
  const splitTextNode = (value) => {
    const nodes = [];
    let lastIndex = 0;
    ARABIC_SPLIT_RE.lastIndex = 0;
    let match;
    while ((match = ARABIC_SPLIT_RE.exec(value)) !== null) {
      if (match.index > lastIndex) {
        nodes.push({ type: 'text', value: value.slice(lastIndex, match.index) });
      }
      nodes.push({
        type: 'html',
        value: `<bdi class="font-arabic-inline" dir="rtl">${match[0]}</bdi>`,
      });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < value.length) {
      nodes.push({ type: 'text', value: value.slice(lastIndex) });
    }
    return nodes.length ? nodes : [{ type: 'text', value }];
  };

  // Recursively walk inline nodes and split any text node that contains Arabic
  const wrapInlineArabic = (nodes) =>
    nodes.flatMap((node) => {
      if (node.type === 'text' && ARABIC_RE.test(node.value)) {
        return splitTextNode(node.value);
      }
      if (Array.isArray(node.children)) {
        return [{ ...node, children: wrapInlineArabic(node.children) }];
      }
      return [node];
    });

  const walk = (node) => {
    if (!Array.isArray(node.children)) return;

    // Walk in reverse so splicing doesn't shift unvisited indices
    for (let i = node.children.length - 1; i >= 0; i--) {
      const child = node.children[i];
      if (child.type === 'paragraph') {
        const text = extractText(child);
        if (!ARABIC_RE.test(text)) {
          walk(child);
          continue;
        }
        if (arabicRatio(text) >= BLOCK_THRESHOLD) {
          // Mostly Arabic: render as a right-aligned Arabic text block
          node.children.splice(
            i,
            1,
            { type: 'html', value: '<div class="font-arabic" dir="rtl">' },
            child,
            { type: 'html', value: '</div>' }
          );
        } else {
          // Mixed paragraph: isolate only the Arabic runs inline with <bdi>
          child.children = wrapInlineArabic(child.children);
        }
      } else {
        walk(child);
      }
    }
  };

  walk(markdownAST);
  return markdownAST;
};
