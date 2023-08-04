/* eslint-disable react/no-danger */
import React from 'react';

export default (props) => {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Montserrat:wght@400;700&family=Noto+Naskh+Arabic&display=swap" rel="stylesheet" />

        {props.headComponents}

        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5442972248172818"
          crossOrigin="anonymous"></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-63FEW7H70N"></script>
      </head>
      <body {...props.bodyAttributes} className="light">
        {props.preBodyComponents}

        <div key="body" dangerouslySetInnerHTML={{ __html: props.body }} id="___gatsby" />

        {props.postBodyComponents}
      </body>
    </html>
  );
};
