// Google AdSense configuration.
//
// Manual ad slots render ONLY when their slot ID is set here, so nothing
// changes on the site until you add real IDs.
//
// How to get a slot ID: AdSense > Ads > By ad unit > Display ads (or
// In-article ads) > create the unit > copy the 10-digit value of
// `data-ad-slot` from the generated code.
//
//   inArticle  In-article ad unit, shown between sections of an article
//   sidebar    Display unit (square/vertical), shown in the sidebar on wide screens
//   articleEnd Multiplex (autorelaxed) unit, shown after "Baca Juga"
//   inFeed     In-feed unit, shown as a card in the article grid on list pages
export const ADS_CLIENT = 'ca-pub-5442972248172818';

export const AD_SLOTS = {
  inArticle: '7974047383',
  sidebar: '3857159885',
  articleEnd: '4684202576',
  inFeed: '6146990157',
};

// In-feed unit: layout key comes from the AdSense code for that unit
// (`data-ad-layout-key`). One ad is shown in the article grid after this card.
export const IN_FEED_LAYOUT_KEY = '-gu-18+5g-2f-83';
export const IN_FEED_AFTER = 6;

// An in-article ad is inserted before this h2 (so after the 2nd section),
// and only when the article has at least MIN_H2_FOR_IN_ARTICLE sections.
export const IN_ARTICLE_BEFORE_H2 = 3;
export const MIN_H2_FOR_IN_ARTICLE = 4;

// Partner ads (not AdSense). Plain links, so they need no script.
// Set `enabled` to false to turn all of them off.
//   banner  Adsterra referral banner (250x250 GIF), shown after "Baca Juga" on articles
//   promo   Text card, shown in the sidebar on wide screens
export const PARTNER_ADS = {
  enabled: true,
  banner: {
    href: 'https://beta.publishers.adsterra.com/referral/RhWnDTMEiS',
    img: 'https://landings-cdn.adsterratech.com/referralBanners/gif/250x250_adsterra_reff.gif',
    alt: 'Adsterra',
    size: 250,
  },
  promo: {
    href: 'https://asiafilm.org/4/0d7154d073712416c9333fc307a7bd6d',
    title: 'Rekomendasi tontonan',
    text: 'Nonton film Asia pilihan, gratis dan tanpa daftar.',
    cta: 'Lihat sekarang',
  },
};
