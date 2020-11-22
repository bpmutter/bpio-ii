import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styles from './footer.module.css'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
export default function Footer() {
  const data = useStaticQuery(query)
  const {
    email,
    github,
    linkedIn,
    twitter,
    name,
  } = data.allContentfulPerson.edges[0].node
  const {
    baseUrl,
    siteDescription,
    siteName,
  } = data.allContentfulSiteInformation.edges[0].node

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
          {console.log('twitter is', twitter)}
        </div>
      </div>
      <div className={styles.siteDescription}>
        <p>{siteDescription}</p>
      </div>
    </footer>
  )
}

const query = graphql`
  query FooterQuery {
    allContentfulSiteInformation {
      edges {
        node {
          baseUrl
          siteDescription
          siteName
        }
      }
    }
    allContentfulPerson {
      edges {
        node {
          email
          github
          twitter
          linkedIn
          name
        }
      }
    }
  }
`
