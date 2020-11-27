import React from 'react'
import { Link } from 'gatsby'
import styles from './navigation.module.css'
import bitmojiNeutral from '../images/bitmoji-neutral.png'
import bitmojibigSmile from '../images/bitmoji-big-smile.png'
import Hamburger from 'react-hamburgers'
import burgers from './hamburgers.css'

export default function Navigation() {
  const [activeMobileMenu, setActiveMobileMenu] = React.useState(false)
  const [smileBitmoji, setSmileBitmoji] = React.useState(false)

  const toggleSmileBitmoji = () => setSmileBitmoji(!smileBitmoji)

  return (
    <nav role="navigation" className={styles.navigation}>
      <link href={burgers} rel="stylesheet"></link>
      <div
        onMouseEnter={() => setSmileBitmoji(true)}
        onMouseLeave={() => setSmileBitmoji(false)}
        onClick={() => setSmileBitmoji(true)}
      >
        <Link to="/" className={styles.leftNavigation}>
          <img
            src={smileBitmoji ? bitmojibigSmile : bitmojiNeutral}
            alt="nav bitmoji"
            className={styles.bitmoji}
          />
          <h2 className={styles.title}>ben.perlmutter</h2>
        </Link>
      </div>
      <div className={styles.secondaryNav}>
        <ul className={styles.rightNavigation}>
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
        <div>
          <div className={styles.mobileNavHamburgerWrapper}>
            <Hamburger
              type="slider"
              active={activeMobileMenu}
              onClick={() => setActiveMobileMenu(!activeMobileMenu)}
              style={{ outline: 'none' }}
            />
          </div>

          {activeMobileMenu && (
            <div
              className={styles.mobileMenuContainer}
              onClick={() => setActiveMobileMenu(false)}
            >
              <ul className={styles.mobileNav}>
                <li className={styles.mobileNavItem}>
                  <Link to="/about">About</Link>
                </li>
                <li className={styles.mobileNavItem}>
                  <Link to="/projects">Projects</Link>
                </li>
                <li className={styles.mobileNavItem}>
                  <Link to="/blog">Blog</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
