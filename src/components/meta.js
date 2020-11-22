import React from 'react'
import Helmet from 'react-helmet'
import propTypes from 'prop-types'

export default function Meta({ title, description }) {
  return (
    <Helmet>
      <title>
        {title ? `${title} | ben.perlmutter.io` : 'ben.perlmutter.io'}
      </title>
      <meta name="description" content={description} />
    </Helmet>
  )
}

Meta.propTypes = {
  title: propTypes.string,
  description: propTypes.string,
}
