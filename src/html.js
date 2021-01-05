/* eslint-disable react/no-danger */
import React from 'react';

export default props => {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes} className="light">
        {props.preBodyComponents}
        <div
          key="body"
          dangerouslySetInnerHTML={{ __html: props.body }}
          id="___gatsby"
        />
        {props.postBodyComponents}

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Horizontal Ads Banner -->
<ins class="adsbygoogle"
     style="display:inline-block;width:728px;height:90px"
     data-ad-client="ca-pub-5442972248172818"
     data-ad-slot="7319719723"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
			
      </body>
    </html>
  );
};
