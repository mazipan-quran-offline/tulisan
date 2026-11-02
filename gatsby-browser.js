import 'prismjs/themes/prism-tomorrow.css';

// View Transitions for client-side navigation.
//
// Gatsby routes on the same document, so CSS-only cross-document transitions
// (`@view-transition { navigation: auto }`) never fire for <Link> clicks. We
// start a same-document transition in onPreRouteUpdate (old snapshot) and
// finish it in onRouteUpdate (after React rendered the new page). Browsers
// without document.startViewTransition, or users who prefer reduced motion,
// get the normal instant navigation.

const CARD_SELECTOR = '.post-card__pattern[data-vt-path]';
const SHARED_NAME = 'post-cover';

let pending = null;

const canTransition = () =>
  typeof document !== 'undefined' &&
  typeof document.startViewTransition === 'function' &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const findCard = pathname =>
  Array.from(document.querySelectorAll(CARD_SELECTOR)).find(
    el => `${__PATH_PREFIX__}${el.dataset.vtPath}` === pathname,
  );

const clearNames = () => {
  document.querySelectorAll(CARD_SELECTOR).forEach(el => {
    el.style.viewTransitionName = '';
  });
};

export const onPreRouteUpdate = ({ location, prevLocation }) => {
  if (!prevLocation || !canTransition()) return;
  if (location.pathname === prevLocation.pathname) return;

  // Forward: name the clicked card's pattern so it morphs into the article cover.
  const card = findCard(location.pathname);
  if (card) card.style.viewTransitionName = SHARED_NAME;

  let release;
  const ready = new Promise(resolve => {
    release = resolve;
  });
  const transition = document.startViewTransition(() => ready);
  pending = { release, fromPath: prevLocation.pathname };
  transition.finished.finally(() => {
    clearNames();
    pending = null;
  });
};

export const onRouteUpdate = ({ prevLocation }) => {
  if (!pending || !prevLocation) return;
  const { release, fromPath } = pending;

  // Back: name the card of the article we just left so the cover morphs back.
  const card = findCard(fromPath);
  if (card) card.style.viewTransitionName = SHARED_NAME;

  // Release on a timer, not requestAnimationFrame: rendering is paused while
  // the browser waits for this promise, so rAF would never fire and the
  // transition would be aborted by the DOM update timeout.
  setTimeout(release, 0);
};
