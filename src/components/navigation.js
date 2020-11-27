import React from 'react'
import { Link } from 'gatsby'
import styles from './navigation.module.css'
import bitmojiNeutral from '../images/bitmoji-neutral.png'
import Hamburger from 'react-hamburgers'
import burgers from './hamburgers.css'

export default function Navigation() {
  const [activeMobileMenu, setActiveMobileMenu] = React.useState(false)

  return (
    <nav role="navigation" className={styles.navigation}>
      <link href={burgers} rel="stylesheet"></link>
      <div>
        <Link to="/" className={styles.leftNavigation}>
          <img
            src={bitmojiNeutral}
            alt="nav bitmoji"
            className={styles.bitmoji}
          />
          <h2>ben.perlmutter</h2>
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
