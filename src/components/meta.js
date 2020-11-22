import React from 'react'
import Helmet from 'react-helmet'

export default function ({ title }) {
  return <Helmet title={`${title} | ben.perlmutter.io`} />
}
