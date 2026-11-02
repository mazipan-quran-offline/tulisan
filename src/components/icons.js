import React from 'react';

// Small shared icon set. All icons are decorative (aria-hidden); put the
// accessible name on the surrounding link or button.
const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
};

const stroke = (children, defaults = {}) => {
  const Icon = ({ size = defaults.size || 18, strokeWidth = defaults.strokeWidth || 2 }) => (
    <svg {...base} width={size} height={size} strokeWidth={strokeWidth}>
      {children}
    </svg>
  );
  return Icon;
};

const solid = (children, defaults = {}) => {
  const Icon = ({ size = defaults.size || 16 }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
    >
      {children}
    </svg>
  );
  return Icon;
};

export const SearchIcon = stroke(
  <>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </>,
);

export const ArrowRightIcon = stroke(<path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />, { size: 14, strokeWidth: 2.5 });
export const ArrowLeftIcon = stroke(<path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />, { size: 14, strokeWidth: 2.5 });
export const ArrowUpIcon = stroke(<path d="M12 19V5m0 0l-7 7m7-7l7 7" />, { size: 20, strokeWidth: 2.5 });
export const ChevronDownIcon = stroke(<polyline points="6 9 12 15 18 9" />, { size: 18, strokeWidth: 2.5 });
export const ChevronLeftIcon = stroke(<polyline points="15 18 9 12 15 6" />, { size: 16, strokeWidth: 2.5 });
export const ChevronRightIcon = stroke(<polyline points="9 18 15 12 9 6" />, { size: 16, strokeWidth: 2.5 });

export const CalendarIcon = stroke(
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </>,
  { size: 14 },
);

export const ClockIcon = stroke(
  <>
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15.5 14" />
  </>,
  { size: 14 },
);

export const SunIcon = stroke(
  <>
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </>,
  { size: 20 },
);

export const MoonIcon = stroke(<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />, { size: 20 });

export const BookOpenIcon = stroke(
  <>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </>,
  { size: 20 },
);

export const LinkIcon = stroke(
  <>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </>,
  { size: 16 },
);

export const SparklesIcon = stroke(
  <>
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
    <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
  </>,
  { size: 16 },
);

export const ExternalIcon = stroke(
  <>
    <path d="M15 3h6v6" />
    <path d="M10 14L21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </>,
  { size: 16 },
);

export const ListIcon = stroke(
  <>
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <circle cx="3.5" cy="6" r="1" />
    <circle cx="3.5" cy="12" r="1" />
    <circle cx="3.5" cy="18" r="1" />
  </>,
  { size: 18 },
);

export const FacebookIcon = solid(
  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
);

export const XIcon = solid(
  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
);

export const WhatsAppIcon = solid(
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />,
);

export const GitHubIcon = stroke(
  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4M9 18c-4.51 2-5-2-7-2" />,
  { size: 16 },
);

// Brand mark: an eight-pointed star (two overlapping squares)
export const StarMark = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <rect x="5.5" y="5.5" width="13" height="13" rx="1.5" />
    <rect x="5.5" y="5.5" width="13" height="13" rx="1.5" transform="rotate(45 12 12)" />
  </svg>
);
