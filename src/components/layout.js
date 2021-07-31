import React from 'react';
import { Link } from 'gatsby';

import { rhythm, scale } from '../utils/typography';

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  let header;

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
          }}
          to={`/`}
        >
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
        {` `}© {new Date().getFullYear()}
        <br />
        Built with ❤️ by
        {` `}
        <a target="_blank" rel="noopener noreferrer" href="https://mazipan.space/">
          Irfan Maulana
        </a>
        <br /><br />
        <a href="https://www.baca-quran.id/stories/">BacaQuran.id Web Stories</a>
        <br /><br />
        <span>Cek juga: </span>
        <a href="https://ksana.in" target="_blank" rel="noopener noreferrer">Ksana.in</a>
        <span>, </span><a href="https://pramuka.online" target="_blank" rel="noopener noreferrer">Pramuka.Online</a
      </footer>
    </div>
  );
};

export default Layout;
