import React, { useEffect, useState } from 'react';

import { ChevronDownIcon, ListIcon } from './icons';

// Rendered on the server from the `headings` GraphQL field. On wide screens it
// is a sticky rail; on small screens it collapses behind a toggle. A scroll
// spy highlights the section currently being read.
const TableOfContents = ({ headings }) => {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const elements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
    if (!elements.length) return undefined;

    // Active section = the last heading that has scrolled past a line just
    // below the sticky header. Position based, so it survives fast jumps.
    let ticking = false;
    const update = () => {
      const line = 120;
      let current = null;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
        else break;
      }
      setActiveId(current);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [headings]);

  return (
    <nav className={`toc${open ? ' is-open' : ''}`} aria-label="Daftar isi">
      <button
        type="button"
        className="toc__toggle"
        aria-expanded={open}
        aria-controls="toc-list"
        onClick={() => setOpen(o => !o)}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
          <ListIcon />
          Daftar isi
        </span>
        <ChevronDownIcon />
      </button>
      <p className="toc__heading" aria-hidden="true">
        Daftar isi
      </p>
      <ol className="toc__list" id="toc-list">
        {headings.map(h => (
          <li key={h.id} className={h.depth === 3 ? 'toc__item--sub' : undefined}>
            <a
              className="toc__link"
              href={`#${h.id}`}
              aria-current={activeId === h.id ? 'location' : undefined}
              onClick={() => setOpen(false)}
            >
              {h.value}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default TableOfContents;
