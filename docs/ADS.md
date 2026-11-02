# Ads (Google AdSense)

How ads work on this blog, why they are set up this way, and how to change them
safely. Read this before touching `src/html.js`, `src/config/ads.js`,
`src/components/AdSlot.js` or `src/components/post-list.js`.

The publisher ID is `ca-pub-5442972248172818`. Publisher and slot IDs are public
(they are in every page's source), so they are safe to keep in the repo.

## Overview

Two mechanisms run side by side:

1. **Auto ads (page-level).** `src/html.js` loads `adsbygoogle.js` once for the
   whole site, with `data-overlays="bottom"`. Auto ads may place a bottom anchor
   banner. Full-screen vignette ads are intentionally disabled (see Decisions).
2. **Manual ad slots.** `AdSlot` renders a single AdSense unit at a fixed place
   in our layout. Slots are configured in `src/config/ads.js`.

## Placements

| Key (`AD_SLOTS`) | Unit type | Where it appears | Component / file |
|---|---|---|---|
| `inArticle` | In-article (`fluid`, `in-article` layout) | Inside an article, before the 3rd `<h2>` (after the 2nd section). Only articles with 4 or more `<h2>` | `splitForAd()` in `src/templates/blog-post.js` |
| `articleEnd` | Multiplex (`autorelaxed`) | After "Baca Juga", before previous/next, on every article. Container max 60rem | `src/templates/blog-post.js` |
| `sidebar` | Display (`auto`, full-width responsive) | Sticky sidebar on home and tag pages, only at 1200px and wider (hidden by CSS below that) | `src/components/Sidebar.js` |
| `inFeed` | In-feed (`fluid` + `data-ad-layout-key`) | One card in the article grid after the 6th article, on home and tag pages with more than 6 articles | `src/components/post-list.js` |

Slot IDs and the in-feed layout key live in `src/config/ads.js`. That file also
holds `IN_ARTICLE_BEFORE_H2`, `MIN_H2_FOR_IN_ARTICLE` and `IN_FEED_AFTER`.

Pages with **no ads**: search (`/search`), 404, the category list (`/tags/`).
Those are thin or utility pages.

## How `AdSlot` behaves

- Renders nothing when its slot ID is `null`/empty. Setting an ID to `null` in
  `src/config/ads.js` is the kill switch for that placement.
- Wrapped in `<aside aria-label="Iklan">` with a visible "Iklan" label.
- Reserves height up front (`.ad-slot__box` min-height) so the page does not jump
  when the ad loads (layout shift).
- Requests the ad (`adsbygoogle.push({})`) only once, when the slot comes within
  300px of the viewport (IntersectionObserver). Falls back to requesting
  immediately if IntersectionObserver is missing.
- If AdSense reports no ad, it sets `data-ad-status="unfilled"` on the `<ins>` and
  CSS (`:has(...)`) collapses the slot (and, for in-feed, its grid cell).
- Hidden when printing.

## Decisions and why

- **Vignette ads are disabled (`data-overlays="bottom"`).** Vignettes rewrite the
  URL to `#google_vignette` and, on this client-side-routed Gatsby site, left a
  blank white page (reported on a post page; the URL was
  `/tulisan/#google_vignette`). Limiting overlays to the bottom anchor removes
  them. This may reduce revenue slightly; it is a deliberate trade-off. To be
  safe also turn Vignettes off in the AdSense console (Auto ads > Ad formats).
- **Manual slots instead of only Auto ads.** Auto ads put ads wherever Google
  decides. Manual slots keep ads away from the title, share buttons, table of
  contents and call-to-action buttons (accidental clicks risk policy problems).
- **Responsive units over fixed sizes.** Most readers are on phones. A fixed
  728x90 banner was tried and dropped: it cannot fit a phone and was clipped by
  the page margins below about 800px. The end-of-article unit is Multiplex
  (responsive) instead.
- **Never request an ad from a hidden container.** AdSense errors on zero-width
  containers. The sidebar slot is hidden by CSS below 1200px, so do not "fix" it
  by showing it on small screens without giving it a real container. (When a
  hidden slot is requested, nothing visible breaks, but errors are logged.)
- **Few placements.** Roughly: article pages have 2 ads, list pages have 2 ads.
  More ads hurt reading, trust and page speed. If something must be added, remove
  or merge another one.
- **Lazy requests.** Keeps ads from competing with content for loading and keeps
  them off the first screen.

## How to change things

**Change a slot ID or turn a placement off:** edit `AD_SLOTS` in
`src/config/ads.js`.

**Add a new placement:**
1. Create the ad unit in AdSense and copy `data-ad-slot` (and, for in-feed,
   `data-ad-layout-key`) from its generated code.
2. Add a key to `AD_SLOTS`.
3. Add a variant to `src/components/AdSlot.js` if the unit type is new (the
   `<ins>` attributes must match the code AdSense generated for that unit).
4. Render `<AdSlot slot={AD_SLOTS.yourKey} variant="..." />` where wanted and add
   the CSS next to the other `.ad-slot--*` rules in `src/styles/global.css`.
5. Do not paste AdSense's snippet (script + `<script>push</script>`) into pages or
   markdown. The site already loads the script once, and `AdSlot` does the push.
   A second copy double-loads ads.

**Do not** put ads in article markdown (`content/blog/**`), above the article
title, next to share/CTA buttons, or on search/404/tag-list pages.

## Testing

Ads cannot be seen in sandboxes or with ad blockers (the AdSense script is
blocked), and new units can show blank space for hours or days after creation.
So verify structure, not the creative:

1. Build and serve (`pnpm run build`, `pnpm exec gatsby serve --prefix-paths`).
2. Check the `<ins class="adsbygoogle">` attributes match what AdSense generated
   (slot, format, layout key).
3. Check placement (for example, that exactly 2 `<h2>` come before the
   in-article ad) and that there is no horizontal scroll at 390px, 820px and
   1440px.
4. After deploy, watch a real phone for layout jumps near ads and for slow pages.

## Outside this repo (cannot be done in code)

- **`ads.txt`:** must be served from the domain root,
  `https://www.baca-quran.id/ads.txt`, not from `/tulisan/`. It belongs to the
  main Baca-Quran.id project. Verify it exists and has the
  `google.com, pub-5442972248172818, DIRECT, ...` line.
- **AdSense console:** blocking controls (sensitive categories matter for Quran
  content), Ad review center, turning Vignettes off, and ad-unit creation.
- **Consent (privacy & messaging):** needed if the site serves visitors in the
  EEA/UK. Not configured here.

## Status and unknowns

- Real ad rendering has **not** been observed by the developers of this setup
  (the build sandbox blocks AdSense). Revenue, fill rate and whether the
  `data-overlays="bottom"` attribute fully removes vignettes in production are
  unverified. Confirm in a real browser and in AdSense reports.
- AdSense menu names and policies change; confirm current rules in the AdSense
  Policy Center rather than relying on this file.
