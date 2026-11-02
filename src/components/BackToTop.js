import React, { useEffect, useState } from 'react';

import { ArrowUpIcon } from './icons';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setVisible(window.scrollY > window.innerHeight * 1.2);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`to-top${visible ? ' is-visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Kembali ke atas"
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUpIcon />
    </button>
  );
};

export default BackToTop;
