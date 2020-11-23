import React from 'react'
import propTypes from 'prop-types'
import Section from '../templates/section'
import Img from 'gatsby-image'
import styles from './technologies.module.css'

export default function Technologies({ techs }) {
  techs = techs.sort((a, b) => {
    const aCode = a.node.technologies.toLowerCase().charCodeAt(0)
    const bCode = b.node.technologies.toLowerCase().charCodeAt(0)
    console.log('a b codes', aCode, bCode)
    return a.node.technologies.toLowerCase() > b.node.technologies.toLowerCase()
      ? 1
      : -1
  })
  // console.log('techs are...', techs)
  return (
    <Section title="Technologies">
      <p>
        I have experience with the following languages, frameworks, and
        technologies.
      </p>
      <div className={styles.techs}>
        {techs.map((tech) => (
          <div key={tech.node.technologies} className={styles.technology}>
            <Img alt={tech.node.technologies} fixed={tech.node.image.fixed} />
            <p className={styles.technologyText}>{tech.node.technologies}</p>
          </div>
        ))}
      </div>
      <h3>Technology Wishlist</h3>
      <p>
        I also firmly believe in continuous learning. A couple of languages,
        frameworks and technologies I want to learn are: Ruby/Rails, Vue.js, and
        Python scraping, and some fundamental data science and analytics. You
        can read more about why I want to learn these technologies in{' '}
        <a href="#">this blog post.</a>
      </p>
    </Section>
  )
}

Technologies.propTypes = {
  techs: propTypes.array.isRequired,
}
