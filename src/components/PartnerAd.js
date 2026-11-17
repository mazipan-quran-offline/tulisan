import React from 'react';

import { PARTNER_ADS, PARTNER_AD_SCRIPT_HOST } from '../config/ads';

const REL = 'nofollow sponsored noopener noreferrer';

// Document for an Adsterra iframe unit. The unit reads a global `atOptions`, so it
// runs in its own iframe: it cannot clash with other ads or with page navigation.
const unitDoc = ({ key, width, height }) =>
  '<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;overflow:hidden}</style></head><body>' +
  `<script>atOptions={'key':'${key}','format':'iframe','height':${height},'width':${width},'params':{}};</script>` +
  `<script src="${PARTNER_AD_SCRIPT_HOST}${key}"></script>` +
  '</body></html>';

// A partner ad, labelled "Iklan" so readers can tell it from content.
// - variant "banner": image banner with a fixed size (no layout shift)
// - variant "rect" / "tower": Adsterra iframe units (300x250 / 160x600)
// Renders nothing when partner ads are disabled in src/config/ads.js.
const PartnerAd = ({ variant = 'banner', className = '' }) => {
  if (!PARTNER_ADS.enabled) return null;

  if (variant === 'rect' || variant === 'tower') {
    const unit = variant === 'rect' ? PARTNER_ADS.rect : PARTNER_ADS.tower;
    return (
      <aside className={`partner-ad partner-ad--${variant} ${className}`.trim()} aria-label="Iklan">
        <span className="ad-slot__label">Iklan</span>
        <iframe
          title="Iklan"
          className="partner-ad__frame"
          width={unit.width}
          height={unit.height}
          srcDoc={unitDoc(unit)}
          loading="lazy"
          scrolling="no"
          sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
          referrerPolicy="no-referrer"
        />
      </aside>
    );
  }

  const { href, img, alt, size } = PARTNER_ADS.banner;
  return (
    <aside className={`partner-ad partner-ad--banner ${className}`.trim()} aria-label="Iklan">
      <span className="ad-slot__label">Iklan</span>
      <a className="partner-ad__link" href={href} target="_blank" rel={REL}>
        <img
          src={img}
          alt={alt}
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      </a>
    </aside>
  );
};

export default PartnerAd;
