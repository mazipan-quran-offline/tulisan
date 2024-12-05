import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import { rhythm, scale } from '../utils/typography';

import "./layout.css"


const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  let header;

  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-undef
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      }

      window.gtag('js', new Date());
      window.gtag('config', 'G-63FEW7H70N');
    }
  }, [])
  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    );
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
            display: 'flex',
            alignItems: 'center',
            gap: '.5em'
          }}
          to={`/`}
        >

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ height: 24, width: 24 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>

          {title}
        </Link>
      </h3>
    );
  }


  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <main>{children}</main>
      <footer
        style={{
          width: '100%',
          textAlign: 'center',
          padding: '.5em 1em',
        }}
      >
        <a href="/">Baca-Quran.id</a>
        {` `}© 2018-{new Date().getFullYear()}
        <br />
        Built with ❤️ by
        {` `}
        <a target="_blank" rel="noopener noreferrer" href="https://mazipan.space/">
          Irfan Maulana
        </a>
        <br />
        <a href="https://www.baca-quran.id/stories/">
          BacaQuran.id Web Stories
        </a>
        <br />
        <span>Cek juga: </span>
        <a href="https://ksana.in/" target="_blank" rel="noopener noreferrer">
          Ksana.in
        </a>
        <span>, </span>
        <a href="https://www.tanyaaja.in/" target="_blank" rel="noopener noreferrer">
          TanyaAja.in
        </a>
      </footer>
    </div>
  );
};

export default Layout;
