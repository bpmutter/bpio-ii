import React from 'react'
import Layout from '../components/layout'
import propTypes from 'prop-types'
import RandomBitmoji from '../components/random-bitmoji'

export default function StaticPage({ title, children }) {
  return (
    <Layout title={title}>
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <RandomBitmoji />
        <h1 className="section-headline" style={{ paddingLeft: 16 }}>
          {title}
        </h1>
      </div>
      {children}
    </Layout>
  )
}

StaticPage.propTypes = {
  title: propTypes.string.required,
}
