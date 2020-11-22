import React from 'react'
import { Link } from 'gatsby'
import base from './base.css'
import Container from './container'
import Navigation from './navigation'
import Meta from './meta'
import Footer from './footer'

function Layout({ children, title }) {
  return (
    <Container>
      <Meta title={title} />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </Container>
  )
}

export default Layout
