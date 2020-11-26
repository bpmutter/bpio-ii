import React from 'react'
import StaticPage from '../templates/static-page'
import styles from './projects.module.css'
import { useStaticQuery, graphql } from 'gatsby'
import BitmojiDivider from '../components/bitmoji-divider'

export default function About() {
  const data = useStaticQuery(query)
  console.log('data is...', data)
  const projects = data.allContentfulProject.edges

  return (
    <StaticPage title="Projects">
      <p>
        Here are a couple of the projects that I'm most proud of and best
        demonstrate my technical ability. All projects listed here and more can
        also be found on my{' '}
        <a href="https://github.com/bpmutter" target="_blank">
          Github
        </a>
        .
      </p>
      <div>
        {projects.map((project, i) => {
          project = project.node
          return (
            <section
              className={styles.project}
              id={project.name}
              key={project.name}
            >
              <div className={styles.projectHeader}>
                <h3 className={styles.projectTitle}>{project.name}</h3>
                <div className={styles.projectLinks}>
                  <a href={project.repositoryUrl} target="_blank">
                    Github
                  </a>{' '}
                  -{' '}
                  <a href={project.projectUrl} target="_blank">
                    Live site
                  </a>
                </div>
              </div>
              <div className={styles.projectContent}>
                <div className={styles.projectDescription}>
                  <div className={styles.projectSummary}>
                    <ul>
                      {project.overview.content[0].content.map((item, i) => {
                        const content = item.content[0].content[0].value
                        return <li key={i}>{content}</li>
                      })}
                    </ul>
                  </div>
                </div>
                <div className={styles.projectImgWrapper}>
                  {console.log('project url', project.primaryImage.file.url)}
                  <div
                    className={styles.projectImg}
                    style={{
                      backgroundImage: `url(${project.primaryImage.file.url})`,
                    }}
                  ></div>
                </div>
              </div>
              <div className={styles.projectTechnologiesUsed}>
                <h4 className={styles.projectTechnologiesUsed}>
                  Technologies Used
                </h4>
                <div className={styles.projectTechnologiesList}>
                  {project.technologies.map((technology) => (
                    <span className={styles.projectTechnology} key={technology}>
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
              {i !== projects.length - 1 && <BitmojiDivider />}
            </section>
          )
        })}
      </div>
    </StaticPage>
  )
}

const query = graphql`
  query ProjectQuery {
    allContentfulProject(
      sort: { order: DESC, fields: publishedDate }
      filter: { node_locale: { eq: "en-US" } }
    ) {
      edges {
        node {
          description
          projectUrl
          repositoryUrl
          name
          node_locale
          overview {
            content {
              content {
                content {
                  content {
                    value
                  }
                }
              }
            }
          }
          primaryImage {
            file {
              url
            }
          }
          technologies
          publishedDate
        }
      }
    }
  }
`
