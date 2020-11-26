import React from 'react'
import base from './base.css' // DO NOT REMOVE...applies site-wide styles
import Container from './container'
import Navigation from './navigation'
import Meta from './meta'
import Footer from './footer'
import { graphql, useStaticQuery } from 'gatsby'

function Layout({ children, title }) {
  const data = useStaticQuery(query)
  const person = data.allContentfulPerson.edges[0].node
  const siteInfo = data.allContentfulSiteInformation.edges[0].node
  return (
    <Container>
      <Meta
        title={title}
        description={siteInfo.siteDescription}
        logo={siteInfo.logo.file.url}
        previewImg={siteInfo.previewImg.file.url}
        url={siteInfo.baseUrl}
        twitter={person.twitter}
      />
      <Navigation />
      <main style={{ padding: '1em 2em' }}>{children}</main>
      <Footer person={person} siteInfo={siteInfo} />
    </Container>
  )
}

const query = graphql`
  query FooterQuery {
    allContentfulSiteInformation {
      edges {
        node {
          baseUrl
          siteDescription
          siteName
          previewImg {
            file {
              url
            }
          }
          logo {
            file {
              url
            }
          }
        }
      }
    }
    allContentfulPerson {
      edges {
        node {
          email
          github
          twitter
          linkedIn
          name
        }
      }
    }
  }
`

export default Layout
