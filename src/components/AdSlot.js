import React, { useEffect, useRef } from 'react';

import { ADS_CLIENT } from '../config/ads';

// A single manual AdSense unit.
// - Renders nothing until a slot ID is configured.
// - Reserves its height up front so the page does not jump when the ad loads.
// - Requests the ad only when scrolled near the viewport.
// - Is labelled "Iklan" so readers can tell it apart from content.
const AdSlot = ({ slot, variant = 'display', className = '' }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!slot || !el) return undefined;

    let requested = false;
    const request = () => {
      if (requested) return;
      requested = true;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // ad script blocked or failed; the reserved space simply stays empty
      }
    };

    if (!('IntersectionObserver' in window)) {
      request();
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          request();
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [slot]);

  if (!slot) return null;

  const inArticle = variant === 'in-article';

  return (
    <aside className={`ad-slot ad-slot--${variant} ${className}`.trim()} aria-label="Iklan">
      <span className="ad-slot__label">Iklan</span>
      <div className="ad-slot__box" ref={ref}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', textAlign: inArticle ? 'center' : undefined }}
          data-ad-client={ADS_CLIENT}
          data-ad-slot={slot}
          data-ad-format={inArticle ? 'fluid' : 'auto'}
          data-ad-layout={inArticle ? 'in-article' : undefined}
          data-full-width-responsive={inArticle ? undefined : 'true'}
        />
      </div>
    </aside>
  );
};

export default AdSlot;
