import React from 'react'
import propTypes from 'prop-types'
import styles from './section.module.css'
export default function Section({ title, children }) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.sectionHeadline}>{title}</h2>
      {children}
    </div>
  )
}

Section.propTypes = {
  title: propTypes.string.isRequired,
}
