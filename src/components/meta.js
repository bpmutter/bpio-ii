import React from 'react'
import Helmet from 'react-helmet'
import propTypes from 'prop-types'

export default function Meta({
  title,
  description,
  logo,
  previewImg,
  url,
  twitter,
}) {
  return (
    <Helmet>
      <title>
        {title ? `${title} | ben.perlmutter.io` : 'ben.perlmutter.io'}
      </title>
      <meta
        property="og:site_name"
        content={title ? `${title} | ben.perlmutter.io` : 'ben.perlmutter.io'}
      />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="title" property="og:title" content={title} />
      <meta name="image" property="og:image" content={previewImg} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1024" />
      <meta property="og:image:height" content="1024" />
      <meta
        name="description"
        property="og:description"
        content={description}
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" description={`@${twitter}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image:src" content={previewImg} />
      <meta name="twitter:domain" content={url} />
    </Helmet>
  )
}

Meta.propTypes = {
  title: propTypes.string,
  description: propTypes.string,
}
