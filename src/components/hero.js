import React from 'react'
import Img from 'gatsby-image'
import { useStaticQuery } from 'gatsby'

import styles from './hero.module.css'

export default function Hero({ person, heroImg }) {
  const {
    name,
    title,
    email,
    twitter,
    github,
    childContentfulPersonShortBioTextNode: {
      childMarkdownRemark: { html },
    },
  } = person
  return (
    <div className={styles.hero}>
      <Img
        className={styles.heroImage}
        alt="Ben Internet Love Bitmoji"
        fixed={heroImg}
      />
      <div className={styles.heroDetails}>
        <h3 className={styles.heroHeadline}>{name}</h3>
        <p className={styles.heroTitle}>{title}</p>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className={styles.heroDescription}
        ></div>
      </div>
    </div>
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "internet-love.png" }) {
      childImageSharp {
        fixed(width: 500, height: 500) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    allContentfulPerson {
      edges {
        node {
          company
          email
          name
          phone
          title
          twitter
          github
          childContentfulPersonShortBioTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
