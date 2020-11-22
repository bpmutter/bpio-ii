import React from 'react'
import Layout from '../components/layout'
import propTypes from 'prop-types'

export default function StaticPage({ title, children }) {
  return (
    <Layout title={title}>
      <div>
        <h1 className="section-headline">{title}</h1>
      </div>
      {children}
    </Layout>
  )
}

StaticPage.propTypes = {
  title: propTypes.string.required,
}
