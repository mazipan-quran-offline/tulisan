import React from 'react';

import { PARTNER_ADS } from '../config/ads';

const REL = 'nofollow sponsored noopener noreferrer';

// A plain-link partner ad, labelled "Iklan" so readers can tell it from content.
// - variant "banner": image banner with a fixed size (no layout shift)
// - variant "promo": small text card
// Renders nothing when partner ads are disabled in src/config/ads.js.
const PartnerAd = ({ variant = 'banner', className = '' }) => {
  if (!PARTNER_ADS.enabled) return null;

  if (variant === 'promo') {
    const { href, title, text, cta } = PARTNER_ADS.promo;
    return (
      <aside className={`partner-ad partner-ad--promo ${className}`.trim()} aria-label="Iklan">
        <span className="ad-slot__label">Iklan</span>
        <a className="partner-ad__card" href={href} target="_blank" rel={REL}>
          <span className="partner-ad__title">{title}</span>
          <span className="partner-ad__text">{text}</span>
          <span className="partner-ad__cta">{cta} &rarr;</span>
        </a>
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
