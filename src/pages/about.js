import React from 'react'
import StaticPage from '../templates/static-page'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import BitmojiDivider from '../components/bitmoji-divider'
import styles from './about.module.css'

export default function About() {
  const data = useStaticQuery(query)
  const [
    personalMainImg,
    aboutMeProfessional,
    aboutMeMore,
    avocadoHeadImg,
  ] = data.allContentfulStaticPage.edges[0].node.content

  return (
    <StaticPage title="About">
      <Img
        fluid={personalMainImg.media.fluid}
        className={styles.mainImg}
        alt={personalMainImg.media.title}
      />
      <div
        dangerouslySetInnerHTML={{
          __html:
            aboutMeProfessional.childContentfulLayoutCopyCopyTextNode
              .childMarkdownRemark.html,
        }}
      ></div>
      <BitmojiDivider />
      <div
        dangerouslySetInnerHTML={{
          __html:
            aboutMeMore.childContentfulLayoutCopyCopyTextNode
              .childMarkdownRemark.html,
        }}
      ></div>
      <Img
        fluid={avocadoHeadImg.media.fluid}
        className={styles.secondaryImg}
        alt={avocadoHeadImg.media.title}
      />
    </StaticPage>
  )
}

const query = graphql`
  query AboutQuery {
    allContentfulStaticPage(
      filter: {
        contentful_id: { eq: "4SndH4Rks5sI9bBZdUpf9N" }
        node_locale: { eq: "en-US" }
      }
    ) {
      edges {
        node {
          content {
            ... on ContentfulLayoutCopy {
              id
              childContentfulLayoutCopyCopyTextNode {
                childMarkdownRemark {
                  html
                }
              }
            }
            ... on ContentfulLayoutMedia {
              id
              media {
                title
                fluid(maxWidth: 500) {
                  aspectRatio
                  base64
                  sizes
                  src
                  srcSet
                  srcSetWebp
                  srcWebp
                  tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`
