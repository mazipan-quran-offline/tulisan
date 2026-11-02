import React, { useEffect, useRef, useState } from 'react';
import { Disqus } from 'gatsby-plugin-disqus';

// Disqus is heavy (scripts, iframes, layout shifts). Mount it only when the
// reader scrolls close to the comment section; the thread is unchanged.
const LazyDisqus = ({ config }) => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window) || !ref.current) {
      setShow(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {show ? (
        <Disqus config={config} />
      ) : (
        <div className="comments-placeholder">Komentar akan dimuat di sini…</div>
      )}
    </div>
  );
};

export default LazyDisqus;
