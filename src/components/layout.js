import React, { useEffect } from 'react';
import { Link } from 'gatsby';

import ThemeToggle from './ThemeToggle';
import BackToTop from './BackToTop';
import { SearchIcon, StarMark, ArrowRightIcon } from './icons';
import '../styles/global.css';

const MAIN_SITE = 'https://www.baca-quran.id';

// Footer links to the main product. Kept as data so the markup stays uniform.
const FOOTER_GROUPS = [
  {
    label: "Al-Qur'an",
    links: [
      { emoji: '📚', text: 'Semua Surah', href: `${MAIN_SITE}/all-surah/` },
      { emoji: '📖', text: 'Baca Per Ayat', href: `${MAIN_SITE}/surah/1/1/` },
      { emoji: '📒', text: 'Juz Amma', href: `${MAIN_SITE}/juz-amma/` },
      { emoji: '🪑', text: 'Ayat Kursi', href: `${MAIN_SITE}/ayat-kursi/` },
    ],
  },
  {
    label: 'Doa & Dzikir',
    links: [
      { emoji: '🙏', text: 'Doa Harian', href: `${MAIN_SITE}/daily-doa/` },
      { emoji: '🧎', text: 'Wirid', href: `${MAIN_SITE}/wirid/` },
      { emoji: '🌅', text: 'Dzikir Pagi & Petang', href: `${MAIN_SITE}/adhkar/` },
      { emoji: '📿', text: 'Tasbih', href: `${MAIN_SITE}/tasbih/` },
      { emoji: '🤲', text: 'Tahlil', href: `${MAIN_SITE}/tahlil/` },
    ],
  },
  {
    label: 'Fitur Lainnya',
    links: [
      { emoji: '💯', text: 'Asmaul Husna', href: `${MAIN_SITE}/asmaul-husna/` },
      { emoji: '⏰', text: 'Jadwal Sholat', href: `${MAIN_SITE}/jadwal-sholat/` },
      { emoji: '⏺️', text: 'Pencatat Ibadah', href: `${MAIN_SITE}/pencatat-ibadah/` },
      { emoji: '📅', text: 'Kalender Hijriyah', href: `${MAIN_SITE}/kalender-hijriyah/` },
    ],
  },
  {
    label: 'Tautan',
    links: [
      { text: 'Baca-Quran.id', href: `${MAIN_SITE}/`, sameTab: true },
      { text: 'Web Stories', href: `${MAIN_SITE}/stories/` },
      { text: 'Web Tool Libraries', href: 'https://tools.mazipan.space/' },
      { text: 'Games', href: 'https://games.mazipan.space/' },
      { text: 'Belajar Coding Anak', href: 'https://coding.mazipan.space/' },
      { text: 'Irfan Maulana', href: 'https://mazipan.space/' },
    ],
  },
];

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRoot = location.pathname === rootPath;
  const isPath = prefix => location.pathname.startsWith(`${__PATH_PREFIX__}${prefix}`);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', 'G-63FEW7H70N');
    }
  }, []);

  return (
    <div className="layout-root">
      <a href="#main-content" className="skip-link">
        Lompat ke konten utama
      </a>

      <header className="site-header">
        <div className="site-header__inner">
          <Link
            to="/"
            className="site-header__logo"
            aria-label={`${title}, beranda`}
            aria-current={isRoot ? 'page' : undefined}
          >
            <span className="site-header__logo-mark">
              <StarMark size={20} />
            </span>
            <span className="site-header__logo-text">{title}</span>
          </Link>

          <nav className="site-header__nav" aria-label="Navigasi utama">
            <Link
              to="/tags/"
              className="site-header__link"
              aria-current={isPath('/tags') || isPath('/tag/') ? 'page' : undefined}
            >
              Kategori
            </Link>
            <Link
              to="/search"
              className="site-header__link"
              aria-label="Cari artikel"
              aria-current={isPath('/search') ? 'page' : undefined}
            >
              <SearchIcon size={18} />
              <span className="site-header__link-label--optional">Cari</span>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main id="main-content" className="site-main" tabIndex={-1}>
        {children}
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__brand">
            <span className="site-footer__site-name">{title}</span>
            <p className="site-footer__copy">
              Kumpulan artikel, panduan, dan tips seputar aplikasi Baca-Qur'an.id. Temukan konten
              berkualitas untuk membantu perjalanan membaca Al-Qur'an Anda.
            </p>
            <a className="btn btn--primary" href={`${MAIN_SITE}/`}>
              Buka Baca-Quran.id
              <ArrowRightIcon />
            </a>
          </div>

          {FOOTER_GROUPS.map(group => (
            <nav key={group.label} className="site-footer__links" aria-label={group.label}>
              <span className="site-footer__link-label" aria-hidden="true">
                {group.label}
              </span>
              {group.links.map(link => (
                <a
                  key={link.href}
                  className="site-footer__link"
                  href={link.href}
                  {...(link.sameTab ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {link.emoji && <span aria-hidden="true">{link.emoji}</span>}
                  {link.text}
                </a>
              ))}
            </nav>
          ))}
        </div>

        <div className="site-footer__bottom">
          <span>© 2018–{new Date().getFullYear()} Baca-Quran.id</span>
          <span aria-hidden="true">·</span>
          <span>Dibuat dengan ❤️ oleh Irfan Maulana</span>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
};

export default Layout;
