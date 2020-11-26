import React from 'react'
import Section from '../templates/section'
import PropTypes from 'prop-types'
import styles from './projects-preview.module.css'

function ProjectsPreview({ projects }) {
  return (
    <Section name="Projects">
      <div className={styles.projectsWrapper}>
        {projects.map((project) => {
          project = project.node
          return (
            <div
              className={styles.projectContainer}
              style={{
                backgroundImage: `url(${project.primaryImage.file.url})`,
              }}
            >
              <div className={styles.projectInfo}>
                <h3 className={styles.projectTitle}>{project.name}</h3>
                <p className={styles.projectDescription}>
                  {project.description}
                </p>
                <div className={styles.projectButtonContainer}>
                  <a
                    className={styles.projectLearnMoreButton}
                    href={`/projects#${project.name}`}
                  >
                    Learn More
                  </a>
                  <a
                    className={styles.projectLearnMoreButton}
                    href={project.projectUrl}
                    target="_blank"
                  >
                    Demo
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className={styles.moreProjects}>
        <a className={styles.projectLearnMoreButton} href="/projects">
          <span className={styles.moreProjectsButtonText}>More Projects</span>
        </a>
      </div>
    </Section>
  )
}

ProjectsPreview.propTypes = {
  projects: PropTypes.array,
}
export default ProjectsPreview
