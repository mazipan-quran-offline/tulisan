import React, { useEffect, useRef } from 'react';

// Thin bar under the header that tracks how far the reader is through the
// article. Purely visual, so it is hidden from assistive technology.
const ReadingProgress = ({ targetId }) => {
  const barRef = useRef(null);

  useEffect(() => {
    const target = document.getElementById(targetId);
    const bar = barRef.current;
    if (!target || !bar) return undefined;

    let ticking = false;
    const update = () => {
      const rect = target.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      const done = Math.min(Math.max(-rect.top + 80, 0), Math.max(total, 1));
      bar.style.transform = `scaleX(${total > 0 ? done / total : 1})`;
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
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [targetId]);

  return (
    <div className="reading-progress" aria-hidden="true">
      <span className="reading-progress__bar" ref={barRef} />
    </div>
  );
};

export default ReadingProgress;
