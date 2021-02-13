import React from 'react'
import Section from '../templates/section'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import styles from './core-competencies.module.css'

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
function CoreCompetencies({ skills }) {
  shuffle(skills) //why not

  return (
    <Section title="Core Competencies">
      <div className={styles.skills}>
        {skills.map((skill) => (
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
