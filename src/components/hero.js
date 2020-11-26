import React from 'react'
import Img from 'gatsby-image'
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
        fluid={heroImg}
        style={{ maxWidth: 325, margin: '1em auto' }}
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
