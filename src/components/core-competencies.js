import React from 'react'
import Section from '../templates/section'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import styles from './core-competencies.module.css'

function CoreCompetencies({ skills }) {
  return (
    <Section title="Core Competencies">
      <div className={styles.skills}>
        {skills.reverse().map((skill) => (
          <div key={skill.node.name}>
            <Img alt={skill.node.name} fixed={skill.node.media.fixed} />
            <h4 className={styles.title}>{skill.node.name}</h4>
          </div>
        ))}
      </div>
    </Section>
  )
}

CoreCompetencies.propTypes = {
  skills: PropTypes.array,
}
export default CoreCompetencies
