/* eslint-disable react/no-danger */
import React from 'react';

const adsWrapper = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '2rem',
};

export default (props) => {
  React.useEffect(() => {
    setTimeout(() => {
      (adsbygoogle = window.adsbygoogle || []).push({});
    }, 1000);
  }, []);

  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes} className="light">
        {props.preBodyComponents}

        <div key="body" dangerouslySetInnerHTML={{ __html: props.body }} id="___gatsby" />

        {props.postBodyComponents}

        <div className="adswrapper" style={adsWrapper}>
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

          <ins
            className="adsbygoogle"
            style="display:block"
            style={{
              display: 'block',
              background: '#fff',
            }}
            data-ad-format="fluid"
            data-ad-layout-key="-6h+ed+1l-6o+ab"
            data-ad-client="ca-pub-5442972248172818"
            data-ad-slot="5701222588"
          ></ins>
        </div>
      </body>
    </html>
  );
};
