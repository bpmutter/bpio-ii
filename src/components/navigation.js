import React from 'react'
import { Link } from 'gatsby'
import styles from './navigation.module.css'

export default function Navigation() {
  return (
    <nav role="navigation">
      <ul className={styles.navigation}>
        <li className={styles.navigationItem}>
          <Link to="/">Home</Link>
        </li>
        <li className={styles.navigationItem}>
          <Link to="/about">About</Link>
        </li>
        <li className={styles.navigationItem}>
          <Link to="/projects">Projects</Link>
        </li>
        <li className={styles.navigationItem}>
          <Link to="/blog">Blog</Link>
        </li>
      </ul>
    </nav>
  )
}
