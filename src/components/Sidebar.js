import React from 'react';
import { Link, withPrefix } from 'gatsby';

import { SearchIcon, ArrowRightIcon } from './icons';
import { formatTag, tagPath } from '../utils/tags';

const MAIN_SITE = 'https://www.baca-quran.id';
const QUICK_LINKS = [
  ['Semua Surah', '/all-surah/'],
  ['Juz Amma', '/juz-amma/'],
  ['Ayat Kursi', '/ayat-kursi/'],
  ['Tasbih Digital', '/tasbih/'],
  ['Doa Harian', '/daily-doa/'],
  ['Jadwal Sholat', '/jadwal-sholat/'],
];

// Sticky side column for list pages. Shown only on wide screens (CSS);
// on smaller screens the same actions live in the hero, topic chips and footer.
const Sidebar = ({ tags = [], activeTag, limit = 14 }) => {
  const sorted = [...tags]
    .sort((a, b) => b.totalCount - a.totalCount || a.fieldValue.localeCompare(b.fieldValue))
    .slice(0, limit);

  return (
    <aside className="sidebar" aria-label="Pencarian dan kategori">
      <form className="sidebar__card sidebar__search" role="search" action={withPrefix('/search')} method="get">
        <label htmlFor="sidebar-q" className="sidebar__title">
          Cari artikel
        </label>
        <div className="search-input-wrapper">
          <SearchIcon size={18} />
          <input
            id="sidebar-q"
            name="q"
            type="search"
            className="search-input search-input--compact"
            placeholder="Ketik kata kunci..."
            autoComplete="off"
          />
        </div>
      </form>

      {sorted.length > 0 && (
        <nav className="sidebar__card" aria-labelledby="sidebar-topics">
          <h2 className="sidebar__title" id="sidebar-topics">
            Topik
          </h2>
          <ul className="sidebar__topics" role="list">
            {sorted.map(({ fieldValue, totalCount }) => (
              <li key={fieldValue}>
                <Link
                  to={tagPath(fieldValue)}
                  className="sidebar__topic"
                  aria-current={fieldValue === activeTag ? 'page' : undefined}
                >
                  {formatTag(fieldValue)}
                  <span className="chip__count">{totalCount}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/tags/" className="sidebar__more">
            Semua kategori
            <ArrowRightIcon size={13} />
          </Link>
        </nav>
      )}

      <nav className="sidebar__card sidebar__card--accent" aria-labelledby="sidebar-main">
        <h2 className="sidebar__title" id="sidebar-main">
          Di Baca-Quran.id
        </h2>
        <ul className="sidebar__links" role="list">
          {QUICK_LINKS.map(([text, path]) => (
            <li key={path}>
              <a href={`${MAIN_SITE}${path}`}>{text}</a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
