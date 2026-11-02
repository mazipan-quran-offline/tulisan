// Builders for schema.org JSON-LD. Only real page data is used; nothing here
// invents values. All URLs are absolute.

export const SITE_URL = 'https://www.baca-quran.id';
const BLOG_URL = `${SITE_URL}/tulisan/`;
const LOGO_URL = `${SITE_URL}/tulisan/icons/icon-192x192.png`;
const IMAGE_URL = `${SITE_URL}/tulisan/meta-image.png`;

const publisher = {
  '@type': 'Organization',
  name: 'Baca-Quran.id',
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: LOGO_URL, width: 192, height: 192 },
};

const author = siteMetadata => ({
  '@type': 'Person',
  name: siteMetadata.author.name,
  url: siteMetadata.social.website,
});

export const websiteSchema = siteMetadata => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteMetadata.title,
  alternateName: 'Tulisan Baca-Quran.id',
  url: BLOG_URL,
  inLanguage: 'id',
  description: siteMetadata.description,
  publisher,
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${BLOG_URL}search/?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
});

export const blogPostingSchema = ({ url, title, description, datePublished, tags, siteMetadata }) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: title,
  description,
  url,
  mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  datePublished,
  dateModified: datePublished,
  inLanguage: 'id',
  image: [IMAGE_URL],
  keywords: tags && tags.length ? tags.join(', ') : undefined,
  author: author(siteMetadata),
  publisher,
});

export const breadcrumbSchema = items => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
});

// Only emitted when the article really has a visible FAQ section.
export const faqSchema = faq =>
  faq && faq.length >= 2
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      }
    : null;
