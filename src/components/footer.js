import React from 'react'
import styles from './footer.module.css'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import bitmojiWorkingDesk from '../images/bitmoji-working-desk.png'

export default function Footer({ person, siteInfo }) {
  const { siteName, baseUrl, siteDescription } = siteInfo
  const { name, github, linkedIn, twitter, email } = person

  return (
    <footer className={styles.wrapper}>
      <div>
        <h3 className={styles.name}>{name}</h3>
        <p>
          <a href={baseUrl}>{siteName}</a>
        </p>
        <p>
          <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>
      <div className={styles.socialIcons}>
        <div>
          <FaGithub className={styles.icon} />{' '}
          <a href={github} rel="noopener noreferrer">
            Github
          </a>
        </div>
        <div>
          <FaLinkedin className={styles.icon} />{' '}
          <a href={linkedIn} rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
        <div>
          <FaTwitter className={styles.icon} />{' '}
          <a href={twitter} rel="noopener noreferrer">
            Twitter
          </a>
        </div>
      </div>
      <div className={styles.siteDescription}>
        <p>{siteDescription}</p>
        <img
          src={bitmojiWorkingDesk}
          alt="Bitmoji working desk"
          className={styles.bitmojiFooter}
        />
      </div>
    </footer>
  )
}
