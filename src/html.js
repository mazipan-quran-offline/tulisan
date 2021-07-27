/* eslint-disable react/no-danger */
import React from 'react';

export default (props) => {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        {props.headComponents}
        <style>
          .table-wrapper { width: 100%; overflow: auto; }
        </style>
      </head>
      <body {...props.bodyAttributes} className="light">
        {props.preBodyComponents}

        <div key="body" dangerouslySetInnerHTML={{ __html: props.body }} id="___gatsby" />

        {props.postBodyComponents}
      </body>
    </html>
  );
};
