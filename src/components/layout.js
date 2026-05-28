import React, { useEffect } from 'react';
import { Link } from 'gatsby';

import ThemeToggle from './ThemeToggle';
import './layout.css';
import '../styles/global.css';

const BookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const BackArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRoot = location.pathname === rootPath;

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
        Skip to main content
      </a>

      <header className="site-header" role="banner">
        <div className="site-header__inner">
          <div className="site-header__brand">
            {isRoot ? (
              <Link to="/" className="site-header__logo">
                <BookIcon />
                {title}
              </Link>
            ) : (
              <Link to="/" className="site-header__back">
                <BackArrowIcon />
                {title}
              </Link>
            )}
          </div>

          <div className="site-header__actions">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="main-content" className="site-main" tabIndex={-1}>
        <div className="site-main__inner">{children}</div>
      </main>

      <footer className="site-footer" role="contentinfo">
        <div className="site-footer__inner">
          <div className="site-footer__brand">
            <span className="site-footer__site-name">{title}</span>
            <p className="site-footer__copy">
              Kumpulan artikel, panduan, dan tips seputar aplikasi Baca-Qur'an.id. Temukan konten berkualitas untuk membantu perjalanan membaca Al-Qur'an Anda.
            </p>
          </div>

          <div className="site-footer__links">
            <span className="site-footer__link-label">Tautan</span>
            <a className="site-footer__link" href="https://www.baca-quran.id/">
              Baca-Quran.id
            </a>
            <a
              className="site-footer__link"
              href="https://www.baca-quran.id/stories/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Web Stories
            </a>
            <a
              className="site-footer__link"
              href="https://tools.mazipan.space/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Web Tool Libraries
            </a>
            <a
              className="site-footer__link"
              href="https://mazipan.space/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Irfan Maulana
            </a>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>© 2018–{new Date().getFullYear()} Baca-Quran.id</span>
          <span aria-hidden="true">·</span>
          <span>Built with ❤️ by Irfan Maulana</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
