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
              class={styles.projectContainer}
              style={{
                backgroundImage: `url(${project.primaryImage.file.url})`,
              }}
            >
              <div class={styles.projectInfo}>
                <h3 class={styles.projectTitle}>{project.name}</h3>
                <p class={styles.projectDescription}>{project.description}</p>
                <div class={styles.projectButtonContainer}>
                  <a
                    class={styles.projectLearnMoreButton}
                    href={`/projects#${project.name}`}
                  >
                    Learn More
                  </a>
                  <a
                    class={styles.projectLearnMoreButton}
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
      <div class={styles.moreProjects}>
        <a class={styles.projectLearnMoreButton} href="/projects">
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
