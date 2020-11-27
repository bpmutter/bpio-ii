import React from 'react'
import propTypes from 'prop-types'
import Section from '../templates/section'
import Img from 'gatsby-image'
import styles from './technologies.module.css'

export default function Technologies({ techs }) {
  techs = techs.sort((a, b) => {
    return a.node.technologies.toLowerCase() > b.node.technologies.toLowerCase()
      ? 1
      : -1
  })
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
    </Section>
  )
}

Technologies.propTypes = {
  techs: propTypes.array.isRequired,
}
