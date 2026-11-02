import React, { useEffect, useRef } from 'react';

import { ADS_CLIENT } from '../config/ads';

// A single manual AdSense unit.
// - Renders nothing until a slot ID is configured.
// - Reserves its height up front so the page does not jump when the ad loads.
// - Requests the ad only when scrolled near the viewport.
// - Is labelled "Iklan" so readers can tell it apart from content.
// variant="banner" is a fixed 728x90 unit. It is hidden by CSS below 800px and
// is never requested while hidden (AdSense errors on zero-width containers).
const BANNER = { width: 728, height: 90 };

const AdSlot = ({ slot, variant = 'display', className = '' }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!slot || !el) return undefined;

    let requested = false;
    const request = () => {
      if (requested) return;
      if (variant === 'banner' && el.offsetParent === null) return; // hidden on this screen
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
  }, [slot, variant]);

  if (!slot) return null;

  const inArticle = variant === 'in-article';
  const banner = variant === 'banner';

  return (
    <aside className={`ad-slot ad-slot--${variant} ${className}`.trim()} aria-label="Iklan">
      <span className="ad-slot__label">Iklan</span>
      <div className="ad-slot__box" ref={ref}>
        <ins
          className="adsbygoogle"
          style={
            banner
              ? { display: 'inline-block', width: BANNER.width, height: BANNER.height }
              : { display: 'block', textAlign: inArticle ? 'center' : undefined }
          }
          data-ad-client={ADS_CLIENT}
          data-ad-slot={slot}
          data-ad-format={banner ? undefined : inArticle ? 'fluid' : 'auto'}
          data-ad-layout={inArticle ? 'in-article' : undefined}
          data-full-width-responsive={inArticle || banner ? undefined : 'true'}
        />
      </div>
    </aside>
  );
};

export default AdSlot;
